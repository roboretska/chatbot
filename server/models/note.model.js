const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String ,
    text: String,

});

const Note = mongoose.model('Note', NoteSchema);
module.export = Note;
