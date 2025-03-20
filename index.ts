import TelegramBot from "node-telegram-bot-api";
import { messages } from "./constants/messages";
import { keyboards } from "./constants/keyboards";
import selectingLanguage from "./actions/selectingLanguage";
import express from "express";
import { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/connect";
import User from "./routes/User";
import topFilms from "./handlers/topFilms";
import { userState } from "./states/language";
import { userMessage } from "./states/messageId";
import { loggedInStartTexts, secondStartText } from "./functions/getBotTexts";
import UserModel from "./models/User";

const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const TOKEN: string = String(process.env.TOKEN);

const bot = new TelegramBot(TOKEN, { polling: true });
bot.deleteWebHook();

bot.onText(/\/start/, async (message) => {
    const userId = Number(message.from?.id);

    if (!userMessage[userId]) {
        userMessage[userId] = { startMessageId: "" };
    }


    if (userState[userId]) {
        const user = await UserModel.findOne({ telegram_id: userId });
        if (user) {
            return bot.sendMessage(message.chat.id, loggedInStartTexts(userId));
        }


        const sentMessage = await bot.sendMessage(message.chat.id, secondStartText(userId), {
            reply_markup: keyboards.signinKeyboard(userId)
        });

        userMessage[userId].startMessageId = String(sentMessage.message_id);
        bot.sendMessage(userId, userMessage[userId].startMessageId)
    } else {
        const sentMessage = await bot.sendMessage(
            message.chat.id,
            messages.startCommand(String(message.chat.username)),
            { reply_markup: keyboards.startKeyboard }
        );

        userMessage[userId].startMessageId = String(sentMessage.message_id);
        bot.sendMessage(userId, userMessage[userId].startMessageId)
    }
});

bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.from.id;
    const messageId = callbackQuery.message?.message_id;

    if (!chatId || !messageId) return;

    if (!userMessage[chatId]) {
        userMessage[chatId] = { startMessageId: "" };
    }

    bot.sendMessage(String(callbackQuery.message?.from?.id), String(userMessage[chatId].startMessageId));

    userMessage[chatId].languageMessageId = String(messageId);

    // Startdagi xabarni o‘chirish
    if (userMessage[chatId].startMessageId) {
        try {
            await bot.deleteMessage(chatId, Number(userMessage[chatId].startMessageId));
        } catch (err) {
            console.error("Xabarni o‘chirishda xatolik ❌", err);
        }
    }

    selectingLanguage(chatId, String(callbackQuery.data), bot);
});

bot.on("message", (message) => {
    if (["Top filmlar", "Top movies", "Лучшие фильмы"].includes(message.text || "")) {
        topFilms(message);
    }
});

const PORT = process.env.PORT || 5122;

app.use("/api/user", User);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
});

bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});

export default bot;
