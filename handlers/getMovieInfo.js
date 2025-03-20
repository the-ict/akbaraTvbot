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
const getBotTexts_1 = require("../functions/getBotTexts");
// callback olish uni moslash
function default_1(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const movieName = (_a = callback.data) === null || _a === void 0 ? void 0 : _a.split("?")[1];
            console.log(movieName);
            const searchRegax = new RegExp(String(movieName), "i");
            const MovieInfo = yield Movie_1.default.findOne({ title: searchRegax });
            if (!MovieInfo) {
                index_1.default.sendMessage((_b = callback.message) === null || _b === void 0 ? void 0 : _b.chat.id, (0, getBotTexts_1.getMovieNotFoundText)(callback.from.id));
            }
            else {
                index_1.default.sendPhoto((_c = callback.message) === null || _c === void 0 ? void 0 : _c.chat.id, MovieInfo.image);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
