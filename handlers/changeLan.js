"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_1 = __importDefault(require("../index"));
const getBotTexts_1 = require("../functions/getBotTexts");
const keyboards_1 = require("../constants/keyboards");
function default_1(message) {
    var _a;
    try {
        index_1.default.sendMessage(message.chat.id, (0, getBotTexts_1.getNewLangText)(Number((_a = message.from) === null || _a === void 0 ? void 0 : _a.id)), {
            reply_markup: keyboards_1.keyboards.startKeyboard
        });
    }
    catch (error) {
        index_1.default.sendMessage(message.chat.id, "Xatolik yuz berdi!");
    }
}
