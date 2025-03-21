import { Message } from "node-telegram-bot-api";
import bot from "../index"
import Movie from "../models/Movie";

export default async function (message: Message) {
    const chatId: string = String(message.chat.id)
    try {
        const movie = await Movie.findOne({ searchId: message.text })
        if (movie) {
            bot.sendPhoto(chatId, movie.image, {
                caption: `<b>${movie.title}</b>\n\n\n<b>manba:</b> <a href="${movie.srcLink ? movie.srcLink : "http://asilmedia.org/"}">${movie.srcName ? movie.srcName : "Asilmedia.uz"}</a>`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [[
                        { text: "Trailerni ko'rish", url: movie.trailer_url }
                    ],
                    [{ text: "Kinoni ko'rish", callback_data: `?w=${movie._id}` }]]
                }
            })
        }
    } catch (error) {

    }
}