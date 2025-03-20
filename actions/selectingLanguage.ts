import { keyboards } from "../constants/keyboards";
import { userState } from "../states/language";
import { userMessage } from "../states/messageId";

export default async function (chatId: number, message: string, bot: any) {
    if (!userState[chatId]) {
        userState[chatId] = { lang: message };
    }

    let responseMessage = "";

    switch (message) {
        case "uz":
            userState[chatId].lang = "uz";
            responseMessage = "Siz uzbek tilini tanladingiz !\nEndi bot funksiyalarini to’liq ishlatish uchun ro’yxatdan o’ting!";
            break;
        case "en":
            userState[chatId].lang = "en";
            responseMessage = "You selected English language! \nNow, to fully use the bot's functions, please register!";
            break;
        case "ru":
            userState[chatId].lang = "ru";
            responseMessage = "Вы выбрали Русский язык! \nТеперь, чтобы полностью использовать функции бота, пожалуйста, зарегистрируйтесь!";
            break;
        default:
            return;
    }

    await bot.sendMessage(chatId, responseMessage, {
        reply_markup: keyboards.signinKeyboard(chatId)
    });
}
