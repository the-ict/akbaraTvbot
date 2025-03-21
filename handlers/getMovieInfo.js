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
// callback olish uni moslash
function default_1(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const movieName = (_a = callback.data) === null || _a === void 0 ? void 0 : _a.split("=")[1];
            const MovieInfo = yield Movie_1.default.findOne({ searchId: movieName });
            if (!MovieInfo) {
                index_1.default.sendMessage(String((_b = callback.message) === null || _b === void 0 ? void 0 : _b.chat.id), "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername");
            }
            else {
                index_1.default.sendPhoto((_c = callback.message) === null || _c === void 0 ? void 0 : _c.chat.id, MovieInfo.image, {
                    caption: `<b>${MovieInfo.title}</b>\n\n\n<b>manba:</b> <a href="${MovieInfo.srcLink ? MovieInfo.srcLink : "http://asilmedia.org/"}">${MovieInfo.srcName ? MovieInfo.srcName : "Asilmedia.uz"}</a>`,
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [[
                                {
                                    text: "Trailerni ko'rish", web_app: {
                                        url: MovieInfo.trailer_url
                                    }
                                }
                            ],
                            [{ text: "Kinoni ko'rish", callback_data: `?w=${MovieInfo._id}` }]]
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
