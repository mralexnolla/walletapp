import { mongoose, Schema } from "mongoose";

const imageDetailsSchema = new Schema({
    email: {
        type: String
    },
    image: {
        type: String
    }
    // collections: {
    //     type: String
    // }
},{timestamps: true})

export const ImageDetails = mongoose.model("imagedetails", imageDetailsSchema);