const mongoose = require('mongoose');

var actorSchema = new mongoose.Schema({
    name: String,
    surname: String,
    photo: String,
    age: Number
});

module.exports = mongoose.model('Actor', actorSchema);