"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const keyboards_1 = require("../constants/keyboards");
const language_1 = require("../states/language");
function default_1(chatId, message, bot) {
    if (!language_1.userState[chatId]) {
        language_1.userState[chatId] = { lang: "" };
    }
    let responseMessage = "";
    switch (message) {
        case "uz":
            language_1.userState[chatId].lang = "uz";
            responseMessage = "Siz uzbek tilini tanladingiz !\nEndi bot funksiyalarini to’liq ishlatish uchun ro’yxatdan o’ting!";
            break;
        case "en":
            language_1.userState[chatId].lang = "en";
            responseMessage = "You selected English language! \nNow, to fully use the bot's functions, please register!";
            break;
        case "ru":
            language_1.userState[chatId].lang = "ru";
            responseMessage = "Вы выбрали Русский язык! \nТеперь, чтобы полностью использовать функции бота, пожалуйста, зарегистрируйтесь!";
            break;
        default:
            return;
    }
    bot.sendMessage(chatId, responseMessage, {
        reply_markup: keyboards_1.keyboards.signinKeyboard(chatId)
    });
}
