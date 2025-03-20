import { userState } from "../states/language";
import { InlineKeyboardMarkup, ReplyKeyboardMarkup } from "node-telegram-bot-api";

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

export const getMovieNotFoundText = (userId: number) => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return "Bunday kino topilmadi!";
        } else if (userLang === "en") {
            return "No such movie found!";
        } else if (userLang === "ru") {
            return "Такой фильм не найден!";
        }
    }
    return "Hech narsa yo'q";
};


// Bu funksiyaning maqsadi foydalanuvchining tiliga qarab tugmalarni qaytarish
export const getMenuKeyboardsText = (userId: number): ReplyKeyboardMarkup => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return {
                keyboard: [
                    [{ text: "Top filmlar" }],
                    [{ text: "Tilni o'zgartirish" }, { text: "Bog‘lanish" }]
                ],
                resize_keyboard: true,
            };
        } else if (userLang === "en") {
            return {
                keyboard: [
                    [{ text: "Top movies" }],
                    [{ text: "Change language" }, { text: "Contact" }]
                ],
                resize_keyboard: true,
            };
        } else if (userLang === "ru") {
            return {
                keyboard: [
                    [{ text: "Лучшие фильмы" }],
                    [{ text: "Изменить язык" }, { text: "Связаться" }]
                ],
                resize_keyboard: true,
            };
        }
    }

    return {
        keyboard: [[{ text: "Default button" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
    };

};


export const getTopFilmsKeyboardsText = (userId: number): InlineKeyboardMarkup => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return {
                inline_keyboard: [
                    [{ text: "1. Hind kinosi", callback_data: "hind1" }],
                    [{ text: "2. Tarjima kinolar", callback_data: "tarjima2" }],
                    [{ text: "3. Premyeralar", callback_data: "premyera3" }]
                ],
            };
        } else if (userLang === "en") {
            return {
                inline_keyboard: [
                    [{ text: "1. Bollywood Movies", callback_data: "hind1" }],
                    [{ text: "2. Dubbed Movies", callback_data: "dubbed2" }],
                    [{ text: "3. Premieres", callback_data: "premiere3" }]
                ],
            };
        } else if (userLang === "ru") {
            return {
                inline_keyboard: [
                    [{ text: "1. Индийские фильмы", callback_data: "hind1" }],
                    [{ text: "2. Дублированные фильмы", callback_data: "dubbed2" }],
                    [{ text: "3. Премьеры", callback_data: "premiere3" }]
                ],
            };
        }
    }

    return {
        inline_keyboard: [[{ text: "Default button", callback_data: "default" }]],
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


export const getSaveErrorText = (userId: number): string => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return "Ma'lumotlarni saqlashda xatolik yuz berdi!";
        } else if (userLang === "en") {
            return "An error occurred while saving the data!";
        } else if (userLang === "ru") {
            return "Произошла ошибка при сохранении данных!";
        } else {
            return "Language not supported!";
        }
    }

    return "An unexpected error occurred!";
};

export const getTopFilmsText = (userId: number): InlineKeyboardMarkup => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return {
                inline_keyboard: [
                    [{ text: "1. 3 Idiots", callback_data: "?movie=hind_bahubali" }],
                    [{ text: "2. Bahubali", callback_data: "?movie=hind_bahubali3" }],
                    [{ text: "3. KGF Chapter 2", callback_data: "?moive=hind_bahubali4" }]
                ],
            };
        } else if (userLang === "en") {
            return {
                inline_keyboard: [
                    [{ text: "1. 3 Idiots", callback_data: "?movie=hind_bahubali" }],
                    [{ text: "2. Bahubali", callback_data: "?movie=hind_bahubali3" }],
                    [{ text: "3. KGF Chapter 2", callback_data: "?moive=hind_bahubali4" }]
                ],
            };
        } else if (userLang === "ru") {
            return {
                inline_keyboard: [
                    [{ text: "1. 3 идиота", callback_data: "?movie=hind_bahubali" }],
                    [{ text: "2. Бахубали", callback_data: "?movie=hind_bahubali3" }],
                    [{ text: "3. КГФ Глава 2", callback_data: "?moive=hind_bahubali4" }]
                ],
            };
        } else {
            return {
                inline_keyboard: [[{ text: "Default button", callback_data: "default" }]],
            };
        }
    } else {
        return {
            inline_keyboard: [[{ text: "Default button", callback_data: "default" }]],
        };
    }
}

export const getChooseText = (userId: number): string => {
    if (userState[userId]) {
        const userLang = userState[userId].lang;

        if (userLang === "uz") {
            return "Tanlang!";
        } else if (userLang === "en") {
            return "Choose!";
        } else if (userLang === "ru") {
            return "Выберите!";
        } else {
            return "Tanlang!";
        }
    } else {
        return "Tanlang!";
    }
};

export const secondStartText = (userId: number): string => {
    if (userState[userId]) {
        const lang = userState[userId].lang;

        if (lang === "uz") {
            return `✅ Siz allaqachon tilni tanlagansiz!\n\nAgar o'zgartirmoqchi bo'lsangiz, /setlan buyrug'ini yuboring!\nBotning barcha funksiyalaridan foydalanish uchun ro'yhatdan o'ting.`;
        } else if (lang === "en") {
            return `✅ You have already selected a language!\n\nIf you want to change it, send the /setlan command!\nRegister to use all bot functions.`;
        } else if (lang === "ru") {
            return `✅ Вы уже выбрали язык!\n\nЕсли хотите изменить, отправьте команду /setlan!\nЗарегистрируйтесь, чтобы использовать все функции бота.`;
        } else {
            return `❌ Language not supported!`;
        }
    } else {
        return `❌ Language not supported!`
    }
};

export const loggedInStartTexts = (userId: number): string => {
    if (userState[userId]) {
        const lang = userState[userId].lang;

        if (lang === "uz") {
            return `✅ Siz allaqachon tilni tanladingiz va ro'yhatdan o'tdingiz!\n\nBoshidan tilni tanlash uchun /setlan buyrug'ini yuboring.`;
        } else if (lang === "en") {
            return `✅ You have already selected a language and registered!\n\nTo select a language from the beginning, send the /setlan command.`;
        } else if (lang === "ru") {
            return `✅ Вы уже выбрали язык и зарегистрировались!\n\nЧтобы выбрать язык с самого начала, отправьте команду /setlan.`;
        } else {
            return `❌ Language not supported!`;
        }
    } else {
        return `❌ Language not supported!`;
    }
};
