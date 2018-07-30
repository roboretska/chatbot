const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String ,
    text: String,

});

module.export = mongoose.model('Note', NoteSchema);
