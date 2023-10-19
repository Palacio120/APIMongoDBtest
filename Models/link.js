import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkShema = new Schema({
    longLink: {
        type: String,
        require: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        unique:false,
        ref: 'User',
        require: true,
    }
});

export const Link = model('Link', linkShema);