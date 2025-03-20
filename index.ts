import TelegramBot from "node-telegram-bot-api";
import { messages } from "./constants/messages";
import { keyboards } from "./constants/keyboards";
import selectingLanguage from "./actions/selectingLanguage";
import express from "express";
import { Express } from "express"
import cors from "cors";
import dotenv from "dotenv"
import { connectDb } from "./config/connect";
import User from "./routes/User"
import topFilms from "./handlers/topFilms";

const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config()

const TOKEN: string = String(process.env.TOKEN);

const bot = new TelegramBot(TOKEN, { polling: true });
bot.deleteWebHook()

bot.onText(/\/start/, (message) => {
    bot.sendMessage(
        message.chat.id,
        messages.startCommand(String(message.chat.username)),
        { reply_markup: keyboards.startKeyboard }
    );
});

bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.from.id;

    console.log("Foydalanuvchi id: ", chatId);

    if (!chatId) return;

    selectingLanguage(chatId, String(callbackQuery.data), bot);
});


bot.on("message", (message) => {
    if (message.text == "Top filmlar" || message.text == "Top movies" || message.text == "Лучшие фильмы") {
        topFilms(message)
    }
});


const PORT = process.env.PORT || 5122;

app.use("/api/user", User)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb()
});

bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});

export default bot