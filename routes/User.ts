import express, { Request, Response } from "express"
import { WebAppRequestBody } from "../constants/types";
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

        try {
            await bot.sendMessage(user_id, messageText);
        } catch (sendError) {
            console.error("Xabar yuborishda xatolik:", sendError);
            res.status(500).json({ error: "Xabar yuborishda xatolik yuz berdi." });
            return;
        }

        await bot.answerWebAppQuery(query_id, {
            type: "article",
            id: query_id,
            title: messageText,
            input_message_content: {
                message_text: messageText,
            },
        });

        res.status(200).json({ message: "Javob muvaffaqiyatli yuborildi" });
    } catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
});



export default router