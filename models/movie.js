const mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    poster: {
        type: String,
        default: "http://via.placeholder.com/350x150",
        required: true
    },
    genre: {
        type: String,
        enum: [
            'Comedy', 'Romance', 'Thriller', 'Horror', 'SciFi', 'Cartoon', 'Action'
        ],
    },
    duration: Number,
    releaseDate: {
        type: Date,
        default: Date.now
    },
    actors: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Actor'
        }
    ]
});

module.exports = mongoose.model('Movie', MovieSchema);