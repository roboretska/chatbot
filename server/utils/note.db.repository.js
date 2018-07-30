const mongoose = require("mongoose");
const model = require("../models/note.model");

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

module.exports.getAllNotes = function getAllNotes() {
    return model.findAll();
}
