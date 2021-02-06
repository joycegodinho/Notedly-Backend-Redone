const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema ({
    content: {
        type: String,
        require: true
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    favoriteCount: {
        type: Number,
        default: 0
    },
    favoritedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
 },
 {
    timestamps: true
 }
);

module.exports = mongoose.model('Note', noteSchema);