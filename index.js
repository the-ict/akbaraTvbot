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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const messages_1 = require("./constants/messages");
const keyboards_1 = require("./constants/keyboards");
const selectingLanguage_1 = __importDefault(require("./actions/selectingLanguage"));
const getBotTexts_1 = require("./functions/getBotTexts");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const TOKEN = String(process.env.TOKEN);
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
bot.onText(/\/start/, (message) => {
    bot.sendMessage(message.chat.id, messages_1.messages.startCommand(String(message.chat.username)), { reply_markup: keyboards_1.keyboards.startKeyboard });
});
bot.on("message", (message) => {
    console.log("Received message:", message);
    if (message === null || message === void 0 ? void 0 : message.web_app_data) {
        try {
            const webAppData = JSON.parse(message.web_app_data.data);
            console.log("Web App Data:", webAppData);
            // WebApp ma'lumotlarini yuborish
            bot.sendMessage(message.chat.id, `Web App ma'lumotlari qabul qilindi: ${JSON.stringify(webAppData, null, 2)}`);
        }
        catch (error) {
            console.error("JSON parse error:", error);
            bot.sendMessage(message.chat.id, "Xatolik: Web App ma'lumotlarini qayta ishlashda muammo yuz berdi.");
        }
    }
});
bot.on("callback_query", (callbackQuery) => {
    var _a;
    const chatId = (_a = callbackQuery.message) === null || _a === void 0 ? void 0 : _a.chat.id;
    if (!chatId)
        return;
    (0, selectingLanguage_1.default)(chatId, String(callbackQuery.data), bot);
});
bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});
app.post("/web-app", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query_id, user_id, lastName, name, phone, country, districts, region } = req.body;
        if (!query_id || !user_id) {
            res.status(400).json({ error: "Query ID yoki User ID mavjud emas." });
        }
        console.log("Qabul qilingan ma'lumotlar:", { lastName, name, phone, country, districts, region });
        const messageText = (0, getBotTexts_1.getQueryText)(user_id) || "OK!";
        yield bot.answerWebAppQuery(query_id, {
            type: "article",
            id: query_id,
            title: messageText,
            input_message_content: {
                message_text: messageText,
            },
        });
        res.status(200).json({ message: "Javob muvaffaqiyatli yuborildi" });
    }
    catch (error) {
        console.error("Serverda xatolik yuz berdi:", error);
        res.status(500).json({ error: "Ichki server xatosi", error_: error });
    }
}));
const PORT = process.env.PORT || 5122;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
