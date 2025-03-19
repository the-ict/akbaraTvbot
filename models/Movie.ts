import mongoose, { Document, Schema } from "mongoose";

export interface IMovie extends Document {
    title: string;
    image: string;
    video_url: string;
    trailer_url: string;
}

const MovieSchema: Schema = new mongoose.Schema({
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
    }
}, { timestamps: true }); 

const Movie = mongoose.model<IMovie>("Movie", MovieSchema);

export default Movie;
