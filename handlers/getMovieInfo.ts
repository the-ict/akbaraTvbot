import bot from "../index"
import { CallbackQuery } from "node-telegram-bot-api"
import Movie from "../models/Movie"

// callback olish uni moslash
export default async function (callback: CallbackQuery) {
    try {
        const movieName = callback.data?.split("=")[1]

        const MovieInfo = await Movie.findOne({ searchId: movieName })

        if (!MovieInfo) {
            bot.sendMessage(String(callback.message?.chat.id), "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername")
        } else {
            bot.sendPhoto(callback.message?.chat.id!, MovieInfo.image, {
                caption: `<b>${MovieInfo.title}</b>\n\n\n<b>manba:</b> <a href="${MovieInfo.srcLink ? MovieInfo.srcLink : "http://asilmedia.org/"}">${MovieInfo.srcName ? MovieInfo.srcName : "Asilmedia.uz"}</a>`,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [[
                        {
                            text: "Trailerni ko'rish", web_app: {
                                url: MovieInfo.trailer_url
                            }
                        }
                    ],
                    [{ text: "Kinoni ko'rish", callback_data: `?w=${MovieInfo._id}` }]]
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}