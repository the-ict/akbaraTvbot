"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryText = void 0;
const language_1 = require("../states/language");
const getQueryText = (userId) => {
    if (language_1.userState[userId]) {
        const userLang = language_1.userState[userId].lang;
        if (userLang === "uz") {
            return "Malumotlaringiz qabul qilindi!";
        }
        else if (userLang === "en") {
            return "Your information has been received!";
        }
        else if (userLang === "ru") {
            return "Ваши данные приняты!";
        }
    }
    else {
        return "Hech narsa yo'q";
    }
};
exports.getQueryText = getQueryText;
