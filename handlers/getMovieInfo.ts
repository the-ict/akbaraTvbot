import bot from "../index"
import { CallbackQuery } from "node-telegram-bot-api"
import Movie from "../models/Movie"
import { getMovieNotFoundText } from "../functions/getBotTexts"

// callback olish uni moslash
export default async function (callback: CallbackQuery) {
    try {
        const movieName = callback.data?.split("?")[1]
        console.log(movieName)

        const searchRegax = new RegExp(String(movieName), "i")

        const MovieInfo = await Movie.findOne({ title: searchRegax })

        if (!MovieInfo) {
            bot.sendMessage(callback.message?.chat.id!, getMovieNotFoundText(callback.from.id));
        } else {
            bot.sendPhoto(callback.message?.chat.id!, MovieInfo.image)
        }

    } catch (error) {
        console.log(error)
    }
}