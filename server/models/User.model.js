const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },


},{timestamps: true});

const User = model("User", userSchema);

module.exports = User;