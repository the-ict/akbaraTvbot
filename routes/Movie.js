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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield Movie_1.default.find();
        const newMovie = yield Movie_1.default.create(Object.assign(Object.assign({}, req.body), { searchId: movies.length + 1 }));
        if (newMovie) {
            res.status(200).json(newMovie);
        }
        else {
            res.status(304).json({ message: "Wrong informations" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;
