import express, { Request, Response } from "express"
import { WebAppRequestBody } from "../constants/types";
import User from "../models/User";
import bot from "../index"
import { getQueryText, getSaveErrorText } from "../functions/getBotTexts";
import { keyboards } from "../constants/keyboards";
import { userMessage } from "../states/messageId";

const router = express.Router()

router.post("/web-app", async (req: Request<{}, {}, WebAppRequestBody>, res: Response) => {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;

        if (!query_id || !user_id || !name || !phone || !country) {
            res.status(400).json({ error: "Zaruriy ma'lumotlar yetishmayapti." });
            return;
        }

        const messageText = getQueryText(user_id) || "OK!";

        bot.sendMessage(user_id, `${messageText}: ${name}`, {
            reply_markup: keyboards.menuKeyboards(user_id)
        })



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

        if (!newUser) {
            bot.sendMessage(user_id, getSaveErrorText(user_id))
        } else {
            await bot.sendMessage(user_id, "O'chirish qismiga o'tdim")
            try {
                if (userMessage[user_id] && userMessage[user_id].languageMessageId) {
                    await bot.deleteMessage(Number(user_id), Number(userMessage[user_id].languageMessageId));
                    console.log(`✅ Xabar o'chirildi: ${userMessage[user_id].languageMessageId}`);
                } else {
                    await bot.sendMessage(Number(user_id), "❌ Message ni o‘chirib bo‘lmadi, chunki u mavjud emas.");
                }
            } catch (error) {
                console.error("❌ Xabarni o‘chirishda xatolik yuz berdi:", error);
                await bot.sendMessage(Number(user_id), "⚠️ Xabarni o‘chirishda xatolik yuz berdi.");
            }

            res.status(200).json({ message: "✅ Javob muvaffaqiyatli yuborildi" });
        }


    } catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
});



export default router