import { CallbackQuery, Message } from "node-telegram-bot-api";
import bot from "../index";
import User from "../models/User";
import { keyboards } from "../constants/keyboards";

export default async function (message: CallbackQuery | Message, callback: Function) {
    const userId: string = String(message.from?.id);
    const chatId: string = String((message as CallbackQuery).message?.chat.id || (message as Message).chat.id);

    try {
        const user = await User.findOne({ telegram_id: userId });

        if (user) {
            callback();
        } else {
            bot.sendMessage(chatId, "Siz hali ro'yhatdan o'tmadingiz\n\nBotdan ham foydalana olmaysiz. Iltimos ro'yhatdan o'ting.", {
                reply_markup: keyboards.signinKeyboard
            });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        bot.sendMessage(chatId, "Botda xatolik mavjud. Iltimos adminga bu xato to'g'risida malumot bering @adminusername");
    }
}
