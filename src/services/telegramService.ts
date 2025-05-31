import axios from "axios";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramNotification(programName: string): Promise<void> {
    const message = `Запись на программу "${programName}" стала доступна!`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });
        console.log(`Notification sent for ${programName}`);
    } catch (error) {
        const err = error as Error;
        console.error(`Error sending Telegram notification for ${programName}:`, err.message);
    }
}