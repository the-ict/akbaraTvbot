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
const Movie_1 = __importDefault(require("../models/Movie"));
function default_1(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatId = String(message.chat.id);
        try {
            const movie = yield Movie_1.default.findOne({ searchId: message.text });
            if (movie) {
                index_1.default.sendPhoto(chatId, movie.image, {
                    caption: `<b>${movie.title}</b>\n\n\n<b>manba:</b> <a href="${movie.srcLink ? movie.srcLink : "http://asilmedia.org/"}">${movie.srcName ? movie.srcName : "Asilmedia.uz"}</a>`,
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [[
                                { text: "Trailerni ko'rish", url: movie.trailer_url }
                            ],
                            [{ text: "Kinoni ko'rish", callback_data: `?w=${movie._id}` }]]
                    }
                });
            }
        }
        catch (error) {
        }
    });
}
