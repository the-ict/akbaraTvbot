"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const messages_1 = require("./constants/messages");
const keyboards_1 = require("./constants/keyboards");
const selectingLanguage_1 = __importDefault(require("./actions/selectingLanguage"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./config/connect");
const User_1 = __importDefault(require("./routes/User"));
const topFilms_1 = __importDefault(require("./handlers/topFilms"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const TOKEN = String(process.env.TOKEN);
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
bot.deleteWebHook();
bot.onText(/\/start/, (message) => {
    bot.sendMessage(message.chat.id, messages_1.messages.startCommand(String(message.chat.username)), { reply_markup: keyboards_1.keyboards.startKeyboard });
});
bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.from.id;
    console.log("Foydalanuvchi id: ", chatId);
    if (!chatId)
        return;
    (0, selectingLanguage_1.default)(chatId, String(callbackQuery.data), bot);
});
bot.on("message", (message) => {
    if (message.text == "Top filmlar" || message.text == "Top movies" || message.text == "Лучшие фильмы") {
        (0, topFilms_1.default)(message);
    }
});
const PORT = process.env.PORT || 5122;
app.use("/api/user", User_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, connect_1.connectDb)();
});
bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});
exports.default = bot;
