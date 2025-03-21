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
const keyboards_1 = require("./constants/keyboards");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = require("./config/connect");
const User_1 = __importDefault(require("./routes/User"));
const topFilms_1 = __importDefault(require("./handlers/topFilms"));
const User_2 = __importDefault(require("./models/User"));
const getMovieInfo_1 = __importDefault(require("./handlers/getMovieInfo"));
const Movie_1 = __importDefault(require("./routes/Movie"));
const getWatch_1 = __importDefault(require("./handlers/getWatch"));
const getMovieWithId_1 = __importDefault(require("./handlers/getMovieWithId"));
const checkingUser_1 = __importDefault(require("./handlers/checkingUser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
const TOKEN = String(process.env.TOKEN);
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
bot.deleteWebHook();
bot.onText(/\/start/, (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = Number((_a = message.from) === null || _a === void 0 ? void 0 : _a.id);
    const user = yield User_2.default.findOne({ telegram_id: userId });
    if (user) {
        return bot.sendMessage(message.chat.id, "✅ Siz allaqachon ro'yhatdan o'tgansiz!\n\nEndi botdan to'liq foydalana olasiz.", {
            reply_markup: keyboards_1.keyboards.menuKeyboards
        });
    }
    else {
        return bot.sendMessage(message.chat.id, `@${(_b = message.from) === null || _b === void 0 ? void 0 : _b.username}\nAssalomu Alaykum\n\nRo'yhatdan o'ting!`, {
            reply_markup: keyboards_1.keyboards.signinKeyboard
        });
    }
}));
bot.on("message", (message) => {
    (0, checkingUser_1.default)(message, () => {
        if (["Top filmlar"].includes(message.text || "")) {
            (0, topFilms_1.default)(message);
        }
        else if (["Bog‘lanish"].includes(message.text || "")) {
            bot.sendMessage(message.chat.id, "Admin judaham band");
        }
        if (!isNaN(Number(message.text))) {
            (0, getMovieWithId_1.default)(message);
        }
    });
});
bot.on("callback_query", (callbackQuery) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatId = callbackQuery.from.id;
    const messageId = (_a = callbackQuery.message) === null || _a === void 0 ? void 0 : _a.message_id;
    if (!chatId && !messageId)
        return;
    (0, checkingUser_1.default)(callbackQuery, () => {
        var _a, _b, _c;
        if (((_a = callbackQuery.data) === null || _a === void 0 ? void 0 : _a.split("=")[0]) === "?w") {
            (0, getWatch_1.default)(callbackQuery, (_b = callbackQuery.data) === null || _b === void 0 ? void 0 : _b.split("=")[1]);
        }
        else if ((_c = callbackQuery.data) === null || _c === void 0 ? void 0 : _c.split("=")[1]) {
            (0, getMovieInfo_1.default)(callbackQuery);
        }
    });
}));
bot.on("video", (video) => {
    var _a;
    bot.sendMessage(video.chat.id, String((_a = video.video) === null || _a === void 0 ? void 0 : _a.file_id));
});
const PORT = process.env.PORT || 5122;
app.use("/api/user", User_1.default);
app.use("/api/movie", Movie_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, connect_1.connectDb)();
});
bot.on("polling_error", (err) => {
    console.error("Polling error:", err);
});
exports.default = bot;
