const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: false,
    },
    tags: {
        type: Array,
        required: false,
    },
    links: {
        type: Array,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const NotesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
    },
    notes: [NoteSchema],
    date: {
        type: Date,
        default: Date.now,
    },
});

const Notes = mongoose.model("Notes", NotesSchema);
module.exports.Notes = Notes;
