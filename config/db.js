const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/Notedly2';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const db = mongoose.connect(url, options)
    .then(() => console.log('Connect to Database'))
    .catch(err => console.log('Error connecting to Database: ' + err))

module.exports = db;