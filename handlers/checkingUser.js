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
exports.default = default_1;
const index_1 = __importDefault(require("../index"));
const User_1 = __importDefault(require("../models/User"));
const keyboards_1 = require("../constants/keyboards");
function default_1(message, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const userId = String((_a = message.from) === null || _a === void 0 ? void 0 : _a.id);
        const chatId = String(((_b = message.message) === null || _b === void 0 ? void 0 : _b.chat.id) || message.chat.id);
        try {
            const user = yield User_1.default.findOne({ telegram_id: userId });
            if (user) {
                callback();
            }
            else {
                index_1.default.sendMessage(chatId, "Siz hali ro'yhatdan o'tmadingiz\n\nBotdan ham foydalana olmaysiz. Iltimos ro'yhatdan o'ting.", {
                    reply_markup: keyboards_1.keyboards.signinKeyboard
                });
            }
        }
        catch (error) {
            console.error("Error occurred:", error);
            index_1.default.sendMessage(chatId, "Botda xatolik mavjud. Iltimos adminga bu xato to'g'risida malumot bering @adminusername");
        }
    });
}
