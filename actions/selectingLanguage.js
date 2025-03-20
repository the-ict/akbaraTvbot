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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const keyboards_1 = require("../constants/keyboards");
const language_1 = require("../states/language");
const User_1 = __importDefault(require("../models/User"));
function default_1(chatId, message, bot) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!language_1.userState[chatId]) {
            language_1.userState[chatId] = { lang: message };
        }
        let responseMessage = "";
        let logged = "";
        switch (message) {
            case "uz":
                language_1.userState[chatId].lang = "uz";
                responseMessage = "Siz uzbek tilini tanladingiz!\nEndi bot funksiyalarini to’liq ishlatish uchun ro’yxatdan o’ting!";
                logged = "Siz uzbek tilini tanladingiz!\nEndi bot funksiyalarini to’liq ishlatishingiz mumkin!";
                break;
            case "en":
                language_1.userState[chatId].lang = "en";
                responseMessage = "You selected English language!\nNow, to fully use the bot's functions, please register!";
                logged = "You have selected the English language!\nNow you can fully use the bot's functions!";
                break;
            case "ru":
                language_1.userState[chatId].lang = "ru";
                responseMessage = "Вы выбрали Русский язык!\nТеперь, чтобы полностью использовать функции бота, пожалуйста, зарегистрируйтесь!";
                logged = "Вы выбрали Русский язык!\nТеперь вы можете полностью использовать функции бота!";
                break;
            default:
                return;
        }
        try {
            const user = yield User_1.default.findOne({ telegram_id: chatId });
            console.log(user);
            if (user) {
                yield bot.sendMessage(chatId, logged);
            }
            else {
                yield bot.sendMessage(chatId, responseMessage, {
                    reply_markup: keyboards_1.keyboards.signinKeyboard(chatId)
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
