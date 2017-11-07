const Movie = require('./models/movie');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movie_app');

var nesto = {
    title: 'Robocop',
    genre: 'SciFi',
    duration: 102
};

Movie.create(nesto, (err, created) => {
    if (err) throw err;
});
