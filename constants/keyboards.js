"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboards = void 0;
const getSignInText_1 = __importDefault(require("../functions/getSignInText"));
exports.keyboards = {
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
            inline_keyboard: [[{ text: String((0, getSignInText_1.default)(chatId)), web_app: { url: "https://akbara-input-form.vercel.app/" } }]]
        };
    }
};
