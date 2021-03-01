const mongoose = require('mongoose');
require('dotenv').config();

var url = process.env.DB_HOST;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useCreateIndex: true
};

const db = mongoose.connect(url, options)
    .then(() => console.log('Connect to Database'))
    .catch(err => console.log('Error connecting to Database: ' + err))

module.exports = db;