"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const language_1 = require("../states/language");
function default_1(userId) {
    if (language_1.userState[userId]) {
        if (language_1.userState[userId].lang == "uz") {
            return "Ro'yhatdan o'tish";
        }
        else if (language_1.userState[userId].lang == "en") {
            return "Register";
        }
        else if (language_1.userState[userId].lang == "ru") {
            return "Регистрация";
        }
        else {
            return "Ro'yhatdan o'tish";
        }
    }
    else {
        return "Ro'yhatdan o'tish";
    }
}
