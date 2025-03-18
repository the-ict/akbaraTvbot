import { userState } from "../states/language"

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
