const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        require: true,
        index: { unique: true }
    },
    email: {
        type: String,
        require: true,
        index: { unique: true }
    }, 
    password: {
        type: String,
        require: true
    }
 },
 {
    timestamps: true
 }
);

module.exports = mongoose.model('User', userSchema);