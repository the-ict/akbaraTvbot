import express, { Request, Response } from "express"
import { WebAppRequestBody } from "../constants/types";
import User from "../models/User";
import bot from "../index"
import { getQueryText, getSaveErrorText } from "../functions/getBotTexts";
import { keyboards } from "../constants/keyboards";

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
        }

        res.status(200).json({ message: "User malumotlari serverga saqlandi !" })
    } catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ telegram_id: req.params.id })

        if (user) res.status(200).json({ user })
        else {
            res.status(200).json({ message: "user mavjud emas" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server error yuzaga keldi" })
    }
})



export default router