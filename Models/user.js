import { schema, model } from "mongoose";

const userSchema = new schema({
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    Password: {
        type: String,
        require: true,
    }
});

export const User = model('user', userSchema);