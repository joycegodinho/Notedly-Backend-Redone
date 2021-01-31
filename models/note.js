const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema ({
    content: {
        type: String,
        require: true
    }, 
    author: {
        type: String,
        require: true
    }
 },
 {
    timestamp: true
 }
);

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;