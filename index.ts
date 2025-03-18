import TelegramBot from "node-telegram-bot-api";
import { messages } from "./constants/messages";
import { keyboards } from "./constants/keyboards";
import selectingLanguage from "./actions/selectingLanguage";
import { getQueryText } from "./functions/getBotTexts";
import express from "express";
import { Request, Response, Express } from "express"
import cors from "cors";
import dotenv from "dotenv"
import { WebAppRequestBody } from "./constants/types";

const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config()

const TOKEN: string = String(process.env.TOKEN);

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (message) => {
    bot.sendMessage(
        message.chat.id,
        messages.startCommand(String(message.chat.username)),
        { reply_markup: keyboards.startKeyboard }
    );
});

bot.on("message", (message) => {
    console.log("Received message:", message);

    if (message?.web_app_data) {
        try {
            const webAppData = JSON.parse(message.web_app_data.data);
            console.log("Web App Data:", webAppData);

            // WebApp ma'lumotlarini yuborish
            bot.sendMessage(message.chat.id, `Web App ma'lumotlari qabul qilindi: ${JSON.stringify(webAppData, null, 2)}`);
        } catch (error) {
            console.error("JSON parse error:", error);
            bot.sendMessage(message.chat.id, "Xatolik: Web App ma'lumotlarini qayta ishlashda muammo yuz berdi.");
        }
    }
});

bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message?.chat.id;

    if (!chatId) return;

    selectingLanguage(chatId, String(callbackQuery.data), bot);
});

bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});


app.post("/web-app", async (req: Request<{}, {}, WebAppRequestBody>, res: Response) => {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;

        if (!query_id || !user_id) {
            res.status(400).json({ error: "Query ID yoki User ID mavjud emas." });
        }

        console.log("Qabul qilingan ma'lumotlar:", { lastName, name, phone, country, districts, region });

        const messageText = getQueryText(user_id) || "OK!";

        await bot.answerWebAppQuery(query_id, {
            type: "article",
            id: query_id,
            title: messageText,
            input_message_content: {
                message_text: messageText,
            },
        });

        res.status(200).json({ message: "Javob muvaffaqiyatli yuborildi" });
    } catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
});

const PORT = process.env.PORT || 5122;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
