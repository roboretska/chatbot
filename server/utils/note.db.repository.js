const mongoose = require("mongoose");
const model = require("../models/note.model");
const config = require("../config");

const Note = mongoose.model('Note');

function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

module.exports.getAllNotes = function getAllNotes() {
    setUpConnection();
    return model.findAll();
};



module.exports.getNote = function (title) {
    setUpConnection();
    return Note.findOne({title: title})
};

module.exports.getAllNotes = function () {
    setUpConnection();
     const query = Note.find();
    return query.exec();
};

module.exports.deleteNote = function title() {
    setUpConnection();
    return Note.remove({title: title})

};
module.exports.saveNote = function (note) {
    setUpConnection();
    return Note.create(note)
};

