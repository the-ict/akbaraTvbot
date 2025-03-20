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
const Movie_1 = __importDefault(require("../models/Movie"));
const create = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Movie_1.default.create({
        title: "Yuklab olish - Bahubali 2: Muqaddima / Hotima O'zbek tilida 2017 Uzbekcha tarjima",
        video_url: "https://fayllar1.ru/2-1-h/Baxubali%202%20Xotima%20Hind%20kino%20720p%20O'zbek%20tilida%20(asilmedia.net).mp4",
        image: "http://asilmedia.org/uploads/mini/fullstory/8e/265x372xaf8fa9d272fc1ce73357173f358d25.jpg.pagespeed.ic.PizCCHbwdN.webp",
        trailer_url: "https://www.youtube.com/watch?v=sOEg_YZQsTI"
    }).then(() => { console.log("Yaratildi"); })
        .catch(err => console.log("xatolik mavjud!", err));
});
create();
