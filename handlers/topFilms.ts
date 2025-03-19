import { getChooseText, getSaveErrorText } from "../functions/getBotTexts"
import { Message } from "node-telegram-bot-api"
import bot from "../index"
import { keyboards } from "../constants/keyboards"

export default function (message: Message) {
    try {
        bot.sendMessage(message.chat.id, getChooseText(Number(message.from?.id)), {
            reply_markup: keyboards.topFilms(Number(message.from?.id))
        })
    } catch (error) {
        bot.sendMessage(message.chat.id, getSaveErrorText(Number(message.from?.id)))
    }
}