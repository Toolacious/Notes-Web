const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        max: 50,
    },
    lname: {
        type: String,
        required: true,
        max: 50,
    },
    name: {
        type: String,
        required: true,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    tokenVersion: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model("User", UserSchema);
