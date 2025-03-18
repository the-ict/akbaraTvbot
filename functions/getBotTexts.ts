import { userState } from "../states/language";
import { ReplyKeyboardMarkup } from "node-telegram-bot-api";

// Bu funksiyaning maqsadi foydalanuvchi uchun kerakli matnni qaytarish
export const getQueryText = (userId: number) => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return "Malumotlaringiz qabul qilindi!";
        } else if (userLang === "en") {
            return "Your information has been received!";
        } else if (userLang === "ru") {
            return "Ваши данные приняты!";
        }
    } else {
        return "Hech narsa yo'q";
    }
}

// Bu funksiyaning maqsadi foydalanuvchining tiliga qarab tugmalarni qaytarish
export const getKeyboards = (userId: number): ReplyKeyboardMarkup => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return {
                keyboard: [
                    [{ text: "Qidirish" }, { text: "Top filmlar" }]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            };
        } else if (userLang === "en") {
            return {
                keyboard: [
                    [{ text: "Search" }, { text: "Top movies" }]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            };
        } else if (userLang === "ru") {
            return {
                keyboard: [
                    [{ text: "Поиск" }, { text: "Лучшие фильмы" }]
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            };
        }
    }

    return {
        keyboard: [[{ text: "Default button" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
    };
};

export const getLoggedInText = (userId: number): string | void => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return "Siz ro'yhatdan o'tdingiz!";
        } else if (userLang === "en") {
            return "You have registered!";
        } else if (userLang === "ru") {
            return "Вы зарегистрированы!";
        } else {
            return "Language not supported!";
        }
    }
}