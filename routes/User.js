"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const index_1 = __importDefault(require("../index"));
const getBotTexts_1 = require("../functions/getBotTexts");
const keyboards_1 = require("../constants/keyboards");
const messageId_1 = require("../states/messageId");
const router = express_1.default.Router();
router.post("/web-app", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;
        if (!query_id || !user_id || !name || !phone || !country) {
            res.status(400).json({ error: "Zaruriy ma'lumotlar yetishmayapti." });
            return;
        }
        const messageText = (0, getBotTexts_1.getQueryText)(user_id) || "OK!";
        index_1.default.sendMessage(user_id, `${messageText}: ${name}`, {
            reply_markup: keyboards_1.keyboards.menuKeyboards(user_id)
        });
        let newUserData = {
            name,
            lastName,
            phone,
            country,
            region: "",
            districts: "",
            telegram_id: user_id
        };
        if (region && districts) {
            newUserData.region = region;
            newUserData.districts = districts;
        }
        const newUser = yield User_1.default.create(newUserData);
        if (!newUser) {
            index_1.default.sendMessage(user_id, (0, getBotTexts_1.getSaveErrorText)(user_id));
        }
        else {
            try {
                // 1️⃣ userMessage obyektini tekshiramiz
                if (!messageId_1.userMessage[user_id] || !messageId_1.userMessage[user_id].languageMessageId) {
                    yield index_1.default.sendMessage(Number(user_id), "❌ Xabar topilmadi, uni o‘chirib bo‘lmadi.");
                }
                else {
                    // 2️⃣ messageId ni raqamga o‘giramiz va noto‘g‘ri qiymatlarni tekshiramiz
                    const messageId = Number(messageId_1.userMessage[user_id].languageMessageId);
                    if (isNaN(messageId) || messageId <= 0) {
                        yield index_1.default.sendMessage(Number(user_id), "❌ Message ID noto‘g‘ri.");
                    }
                    // 3️⃣ Xabarni o‘chiramiz
                    yield index_1.default.deleteMessage(Number(user_id), messageId);
                    console.log(`✅ Xabar o‘chirildi: ${messageId}`);
                }
            }
            catch (error) {
                console.error("❌ Xabarni o‘chirishda xatolik yuz berdi:", error);
                yield index_1.default.sendMessage(Number(user_id), "⚠️ Xabarni o‘chirishda xatolik yuz berdi.");
            }
            res.status(200).json({ message: "✅ Javob muvaffaqiyatli yuborildi" });
        }
    }
    catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
}));
exports.default = router;
