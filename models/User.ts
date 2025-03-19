import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string,
    lastName: string,
    phone: string,
    country: string,
    region?: string,
    disticts?: string,
    telegram_id: string,
    telegram_username: string,
}

const UserSchema: Schema = new mongoose.Schema({
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

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
