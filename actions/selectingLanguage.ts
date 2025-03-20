import { keyboards } from "../constants/keyboards";
import { userState } from "../states/language";
import User from "../models/User"

export default async function (chatId: number, message: string, bot: any) {
    if (!userState[chatId]) {
        userState[chatId] = { lang: message };
    }

    let responseMessage = "";
    let logged = "";

    switch (message) {
        case "uz":
            userState[chatId].lang = "uz";
            responseMessage = "Siz uzbek tilini tanladingiz!\nEndi bot funksiyalarini to’liq ishlatish uchun ro’yxatdan o’ting!";
            logged = "Siz uzbek tilini tanladingiz!\nEndi bot funksiyalarini to’liq ishlatishingiz mumkin!";
            break;
        case "en":
            userState[chatId].lang = "en";
            responseMessage = "You selected English language!\nNow, to fully use the bot's functions, please register!";
            logged = "You have selected the English language!\nNow you can fully use the bot's functions!";
            break;
        case "ru":
            userState[chatId].lang = "ru";
            responseMessage = "Вы выбрали Русский язык!\nТеперь, чтобы полностью использовать функции бота, пожалуйста, зарегистрируйтесь!";
            logged = "Вы выбрали Русский язык!\nТеперь вы можете полностью использовать функции бота!";
            break;
        default:
            return;
    }


    try {
        const user = await User.findOne({ telegram_id: chatId })
        console.log(user)
        if (user) {
            await bot.sendMessage(chatId, logged)
        } else {
            await bot.sendMessage(chatId, responseMessage, {
                reply_markup: keyboards.signinKeyboard(chatId)
            });
        }
    } catch (error) {
        console.log(error)
    }
}
