import { Message } from "node-telegram-bot-api";
import bot from "../index"
import { getNewLangText } from "../functions/getBotTexts";
import { keyboards } from "../constants/keyboards";

export default function (message: Message) {
    try {
        bot.sendMessage(message.chat.id, getNewLangText(Number(message.from?.id)), {
            reply_markup: keyboards.startKeyboard
        })
    } catch (error) {
        bot.sendMessage(message.chat.id, "Xatolik yuz berdi!")
    }
}