"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_1 = __importDefault(require("../index"));
const keyboards_1 = require("../constants/keyboards");
function default_1(message) {
    try {
        index_1.default.sendMessage(message.chat.id, "Tanlang!", {
            reply_markup: keyboards_1.keyboards.topFilms
        });
    }
    catch (error) {
        index_1.default.sendMessage(message.chat.id, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername");
    }
}
