"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const keyboards_1 = require("../constants/keyboards");
const language_1 = require("../states/language");
const messageId_1 = require("../states/messageId");
function default_1(chatId, message, bot) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!language_1.userState[chatId]) {
            language_1.userState[chatId] = { lang: message };
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
        const messageId = yield bot.sendMessage(chatId, responseMessage, {
            reply_markup: keyboards_1.keyboards.signinKeyboard(chatId)
        });
        if (messageId) {
            if (messageId_1.userMessage[chatId]) {
                messageId_1.userMessage[chatId].languageMessageId = messageId;
            }
            else {
                bot.sendMessage(chatId, "Bunday chatidlik user messages mavjud emas");
            }
        }
        else {
            bot.sendMessage(chatId, `Message id mavjud emas : ${messageId}`);
        }
    });
}
