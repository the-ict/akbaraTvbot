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
const router = express_1.default.Router();
router.post("/web-app", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;
        if (!query_id || !user_id || !name || !phone || !country) {
            res.status(400).json({ error: "Zaruriy ma'lumotlar yetishmayapti." });
            return;
        }
        console.log("Qabul qilingan ma'lumotlar:", { lastName, name, phone, country, districts, region, user_id, query_id });
        index_1.default.sendMessage(user_id, `Malumotlaringiz saqlandi ${name}`);
        const messageText = (0, getBotTexts_1.getQueryText)(user_id) || "OK!";
        yield index_1.default.answerWebAppQuery(query_id, {
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
        };
        if (region && districts) {
            newUserData.region = region;
            newUserData.districts = districts;
        }
        const newUser = yield User_1.default.create(newUserData);
        console.log(newUser, "created user");
        res.status(200).json({ message: "Javob muvaffaqiyatli yuborildi" });
    }
    catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
}));
exports.default = router;
