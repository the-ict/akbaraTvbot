import TelegramBot from "node-telegram-bot-api";
import { keyboards } from "./constants/keyboards";
import express from "express";
import { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/connect";
import User from "./routes/User";
import topFilms from "./handlers/topFilms";
import UserModel from "./models/User";
import getMovieInfo from "./handlers/getMovieInfo";
import Movie from "./routes/Movie"
import getWatch from "./handlers/getWatch";
import getMovieWithId from "./handlers/getMovieWithId";
import checkingUser from "./handlers/checkingUser";


const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const TOKEN: string = String(process.env.TOKEN);

const bot = new TelegramBot(TOKEN, { polling: true });
bot.deleteWebHook();

bot.onText(/\/start/, async (message) => {
    const userId = Number(message.from?.id);

    const user = await UserModel.findOne({ telegram_id: userId });

    if (user) {
        return bot.sendMessage(message.chat.id, "✅ Siz allaqachon ro'yhatdan o'tgansiz!\n\nEndi botdan to'liq foydalana olasiz.", {
            reply_markup: keyboards.menuKeyboards
        });
    } else {
        return bot.sendMessage(message.chat.id, `@${message.from?.username}\nAssalomu Alaykum\n\nRo'yhatdan o'ting!`, {
            reply_markup: keyboards.signinKeyboard
        })
    }
});

bot.on("message", (message) => {
    checkingUser(message, () => {
        if (["Top filmlar"].includes(message.text || "")) {
            topFilms(message);
        }

        else if (["Bog‘lanish"].includes(message.text || "")) {
            bot.sendMessage(message.chat.id, "Admin judaham band")
        }

        if (!isNaN(Number(message.text))) {
            getMovieWithId(message)
        }
    })
});

bot.on("callback_query", async (callbackQuery) => {
    const chatId = callbackQuery.from.id;
    const messageId = callbackQuery.message?.message_id;
    if (!chatId && !messageId) return
    checkingUser(callbackQuery, () => {

        if (callbackQuery.data?.split("=")[0] === "?w") {
            getWatch(callbackQuery, callbackQuery.data?.split("=")[1])
        }
        else if (callbackQuery.data?.split("=")[1]) {
            getMovieInfo(callbackQuery)
        }
    })

});


bot.on("video", (video) => {
    bot.sendMessage(video.chat.id, String(video.video?.file_id))
})


const PORT = process.env.PORT || 5122;

app.use("/api/user", User);
app.use("/api/movie", Movie)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDb();
});

bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});

export default bot;
