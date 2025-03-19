import express, { Request, Response } from "express"
import { WebAppRequestBody } from "../constants/types";
import User from "../models/User";
import bot from "../index"
import { getQueryText } from "../functions/getBotTexts";

const router = express.Router()


router.post("/web-app", async (req: Request<{}, {}, WebAppRequestBody>, res: Response) => {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;

        if (!query_id || !user_id || !name || !phone || !country) {
            res.status(400).json({ error: "Zaruriy ma'lumotlar yetishmayapti." });
            return;
        }

        console.log("Qabul qilingan ma'lumotlar:", { lastName, name, phone, country, districts, region, user_id, query_id });

        const messageText = getQueryText(user_id) || "OK!";

        bot.sendMessage(user_id, `${messageText}: ${name}`)

        let newUserData = {
            name,
            lastName,
            phone,
            country,
            region: "",
            districts: "",
            telegram_id: user_id
        }

        if (region && districts) {
            newUserData.region = region
            newUserData.districts = districts
        }

        const newUser = await User.create(newUserData)
        bot.sendMessage(user_id, `${messageText}: ${newUser.name}`)

        console.log(newUser, "created user")

        res.status(200).json({ message: "Javob muvaffaqiyatli yuborildi" });
    } catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
});



export default router