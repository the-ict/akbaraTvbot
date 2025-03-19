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

        await bot.answerWebAppQuery(query_id, {
            type: "article",
            id: query_id,
            title: "Registration",
            input_message_content: {
                message_text: messageText,
            },
        });

        let newUserData = {
            name,
            lastName,
            phone,
            country,
            region: "",
            districts: ""
        }

        if (region && districts) {
            newUserData.region = region
            newUserData.districts = districts
        }

        const newUser = new User(newUserData)
        const savedUser = await newUser.save()

        console.log(savedUser, "created user")

        res.status(200).json({ message: "Javob muvaffaqiyatli yuborildi" });
    } catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
});



export default router