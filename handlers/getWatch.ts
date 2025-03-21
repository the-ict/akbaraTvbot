import { CallbackQuery } from "node-telegram-bot-api";
import bot from "../index"
import Movie from "../models/Movie";

export default async function (callback: CallbackQuery, movieId: string) {
    const chatId: string = String(callback.message?.chat.id)
    try {
        const movie = await Movie.findById(movieId)
        if (!movie) {
            bot.sendMessage(chatId, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername")
        } else {
            bot.sendVideo(chatId, movie.video_url, {
                caption: movie.title,
                parse_mode: "HTML"
            })
        }
    } catch (error) {
        bot.sendMessage(chatId, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername")

    }
}