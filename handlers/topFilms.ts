import { Message } from "node-telegram-bot-api"
import bot from "../index"
import { keyboards } from "../constants/keyboards"

export default function (message: Message) {
    try {
        bot.sendMessage(message.chat.id, "Tanlang!", {
            reply_markup: keyboards.topFilms
        })
    } catch (error) {
        bot.sendMessage(message.chat.id, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername")
    }
}