"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    },
    trailer_url: {
        type: String,
        required: true
    },
    searchId: {
        type: Number,
        required: true
    },
    srcLink: {
        type: String,
        required: true
    },
    srcName: {
        type: String,
        required: true
    }
}, { timestamps: true });
const Movie = mongoose_1.default.model("Movie", MovieSchema);
exports.default = Movie;
