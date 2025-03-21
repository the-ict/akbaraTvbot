import express, { Request, Response } from "express"
import User from "../models/User";
import bot from "../index"
import { keyboards } from "../constants/keyboards";
import dotenv from "dotenv"

dotenv.config()

const admins: string[] = process.env.ADMINS ? process.env.ADMINS.split(",") : [];

const router = express.Router()

router.post("/web-app", async (req: Request, res: Response) => {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;

        if (!query_id || !user_id || !name || !phone || !country) {
            res.status(400).json({ error: "Zaruriy ma'lumotlar yetishmayapti." });
            return;
        }

        const messageText = "Siz ro'yhatdan o'tingiz"

        bot.sendMessage(user_id, `${messageText}: ${name}`, {
            reply_markup: keyboards.menuKeyboards
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
            bot.sendMessage(user_id, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername")
        } else {
            if (admins?.length > 0) {
                for (const admin in admins) {
                    await bot.sendMessage(admin, `Yangi user qo'shildi\nUser id: ${user_id}\nIsmi : ${name}`)
                }
            }
            res.status(200).json({ message: "User malumotlari serverga saqlandi !" })
        }
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