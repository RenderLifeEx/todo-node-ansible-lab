import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_NAVIGATOR_CHAT_ID = process.env.TELEGRAM_NAVIGATOR_CHAT_ID;

// Создаем базовую конфигурацию для запроса
const getAxiosConfig = () => {
    const config: any = {
        timeout: 10_000,
        proxy: false, // отключаем встроенный proxy axios, чтобы не слал обычный HTTP
    };

    // Если заданы настройки прокси, используем httpsAgent для CONNECT-туннеля
    if (process.env.HTTP_PROXY_HOST) {
        const { HTTP_PROXY_HOST, HTTP_PROXY_PORT, HTTP_PROXY_USER, HTTP_PROXY_PASS } = process.env;
        const auth = HTTP_PROXY_USER
            ? `${HTTP_PROXY_USER}:${HTTP_PROXY_PASS}@`
            : "";
        const proxyUrl = `http://${auth}${HTTP_PROXY_HOST}:${HTTP_PROXY_PORT}`;
        config.httpsAgent = new HttpsProxyAgent(proxyUrl);
    }

    return config;
};

export async function sendTelegramNotification(programName: string): Promise<void> {
    const message = `Запись на программу "${programName}" стала доступна!`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await axios.post(
            url,
            {
                chat_id: TELEGRAM_NAVIGATOR_CHAT_ID,
                text: message
            },
            getAxiosConfig(),
        ); // Передаем конфиг с прокси
        console.log(`Notification sent for ${programName}`);
    } catch (error) {
        const err = error as Error;
        console.error(`Error sending Telegram notification for ${programName}:`, err.message);
    }
}
