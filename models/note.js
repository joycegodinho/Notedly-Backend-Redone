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
    timestamps: true
 }
);

module.exports = mongoose.model('Note', noteSchema);