"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
    },
    disticts: {
        type: String,
    },
    telegram_id: {
        type: String,
        required: true,
    },
    telegram_username: {
        type: String,
        required: true
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
