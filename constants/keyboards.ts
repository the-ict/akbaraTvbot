import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from "node-telegram-bot-api";

interface IKeyboards {
    signinKeyboard: InlineKeyboardMarkup;
    menuKeyboards: ReplyKeyboardMarkup;
    topFilms: InlineKeyboardMarkup;
}

export const keyboards: IKeyboards = {
    signinKeyboard: {
        inline_keyboard: [[{ text: "Ro'yhatdan o'tish", web_app: { url: "https://akbara-input-form.vercel.app/" } }]]
    },
    menuKeyboards: {
        keyboard: [
            [{ text: "Top filmlar" }, { text: "Bog‘lanish" }],
        ],
        resize_keyboard: true,
    },
    topFilms: {
        inline_keyboard: [
            [{ text: "1. 3 Idiots", callback_data: "?movie=1" }],
            [{ text: "2. Bahubali", callback_data: "?movie=3" }],
            [{ text: "3. KGF Chapter 2", callback_data: "?moive=3" }]
        ],
    }
};
