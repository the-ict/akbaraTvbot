import { userState } from "../states/language"

export default function (userId: number): string | void {
    if (userState[userId]) {
        if (userState[userId].lang == "uz") {
            return "Ro'yhatdan o'tish"
        }
        else if (userState[userId].lang == "en") {
            return "Register"
        }
        else if (userState[userId].lang == "ru") {
            return "Регистрация"
        }
    }
}