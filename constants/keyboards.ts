import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from "node-telegram-bot-api";
import getSignInText from "../functions/getSignInText";
import { getKeyboards } from "../functions/getBotTexts"

interface IKeyboards {
    startKeyboard: InlineKeyboardMarkup;
    signinKeyboard: (chatId: number) => InlineKeyboardMarkup;
    menuKeyboards: (userId: number) => ReplyKeyboardMarkup
}

export const keyboards: IKeyboards = {
    startKeyboard: {
        inline_keyboard: [
            [
                { text: "Uz 🇺🇿", callback_data: "uz" },
                { text: "En 🇺🇸", callback_data: "en" },
                { text: "Ru 🇷🇺", callback_data: "ru" },
            ],
        ],
    },
    signinKeyboard: (chatId) => {
        return {
            inline_keyboard: [[{ text: String(getSignInText(chatId)), web_app: { url: "https://akbara-input-form.vercel.app/" } }]]
        };
    },
    menuKeyboards: (userId): ReplyKeyboardMarkup => {
        return getKeyboards(userId)
    }
};
