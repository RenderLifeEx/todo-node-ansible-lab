import axios from "axios";
import cron from "node-cron";
import { programs, Program } from "../models/program";
import { sendTelegramNotification } from "./telegramService";

async function checkProgramAvailability(program: Program): Promise<void> {
    try {
        const response = await axios.get(program.url, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
            }
        });

        const html = response.data;
        const unavailableCount = (html.match(/Запись недоступна/g) || []).length;

        if (unavailableCount < 2) {
            if (program.lastStatus === 'unavailable') {
                program.lastStatus = 'available';
                await sendTelegramNotification(program.name);
            }
        } else {
            program.lastStatus = 'unavailable';
        }
    } catch (error) {
        const err = error as Error;
        console.error(`Ошибка проверки программы - ${program.name}:`, err.message);
    }
}

async function checkAllPrograms(): Promise<void> {
    for (const program of programs) {
        await checkProgramAvailability(program);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Задержка 3 секунд между запросами
    }
}

export function initProgramChecker(enable = false): void {
    if (enable) {
        // Запускаем проверку сразу при старте
        checkAllPrograms();

        // Затем каждые 10 секунд
        cron.schedule('*/30 * * * * *', () => {
            checkAllPrograms();
        });

        console.log('Проверка доступности программы для записи - включена');
    } else {
        console.log('Проверка выключена');
    }
}