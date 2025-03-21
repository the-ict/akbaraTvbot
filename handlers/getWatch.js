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
function default_1(callback, movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chatId = String((_a = callback.message) === null || _a === void 0 ? void 0 : _a.chat.id);
        try {
            const movie = yield Movie_1.default.findById(movieId);
            if (!movie) {
                index_1.default.sendMessage(chatId, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername");
            }
            else {
                index_1.default.sendVideo(chatId, movie.video_url, {
                    caption: movie.title,
                    parse_mode: "HTML"
                });
            }
        }
        catch (error) {
            index_1.default.sendMessage(chatId, "Botda xatolik mavjud\nIltimos adminga bu xato to'g'risida malumot bering @adminusername");
        }
    });
}
