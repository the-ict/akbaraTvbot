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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./config/connect");
const User_1 = __importDefault(require("./routes/User"));
const topFilms_1 = __importDefault(require("./handlers/topFilms"));
const language_1 = require("./states/language");
const messageId_1 = require("./states/messageId");
const getBotTexts_1 = require("./functions/getBotTexts");
const User_2 = __importDefault(require("./models/User"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const TOKEN = String(process.env.TOKEN);
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
bot.deleteWebHook();
bot.onText(/\/start/, (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = Number((_a = message.from) === null || _a === void 0 ? void 0 : _a.id);
    if (!messageId_1.userMessage[userId]) {
        messageId_1.userMessage[userId] = { startMessageId: "" };
    }
    const user = yield User_2.default.findOne({ telegram_id: userId });
    if (language_1.userState[userId]) {
        if (user) {
            return bot.sendMessage(message.chat.id, (0, getBotTexts_1.loggedInStartTexts)(userId), {
                reply_markup: keyboards_1.keyboards.menuKeyboards(userId)
            });
        }
        const sentMessage = yield bot.sendMessage(message.chat.id, (0, getBotTexts_1.secondStartText)(userId), {
            reply_markup: keyboards_1.keyboards.signinKeyboard(userId)
        });
        messageId_1.userMessage[userId].startMessageId = String(sentMessage.message_id);
    }
    else {
        const sentMessage = yield bot.sendMessage(message.chat.id, messages_1.messages.startCommand(String(message.chat.username)), { reply_markup: keyboards_1.keyboards.startKeyboard });
        messageId_1.userMessage[userId].startMessageId = String(sentMessage.message_id);
        bot.sendMessage(userId, messageId_1.userMessage[userId].startMessageId);
    }
}));
bot.on("callback_query", (callbackQuery) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = callbackQuery.from.id;
    const messageId = (_a = callbackQuery.message) === null || _a === void 0 ? void 0 : _a.message_id;
    if (!chatId || !messageId)
        return;
    if (!messageId_1.userMessage[chatId]) {
        messageId_1.userMessage[chatId] = { startMessageId: "" };
    }
    (0, selectingLanguage_1.default)(chatId, String(callbackQuery.data), bot);
}));
bot.on("message", (message) => {
    if (["Top filmlar", "Top movies", "Лучшие фильмы"].includes(message.text || "")) {
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
