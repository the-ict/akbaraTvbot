"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboards = void 0;
exports.keyboards = {
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
