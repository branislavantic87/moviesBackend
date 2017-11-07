const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();
const Movie = require('../models/movie');
const Actor = require('../models/actor');
// const validator = require('validator');

mongoose.connect('mongodb://localhost/movie_app', {
    useMongoClient: true
});

// var check = (input, validator, flag) => {
//     input = input.replace(/ /g, '');
//     if (validator.isEmpty(input))
//     { 
//         console.log('STOP! EMPTY!');
//         return 0;
//     } else if(validator[flag](input)) {
//         console.log("IT IS TRUE!");
//     } else {
//         console.log("FALSE!");
//     }
// }

//Index
router.get('/movies', (req, res) => {
    Movie.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});
//New
router.get('/movies/new', (req, res) => {
    res.render('movies/new');
});

//Create 
router.post('/movies', (req, res) => {
    var newMovie = {
        title: req.body.title,
        poster: req.body.poster,
        genre: req.body.genre,
        duration: req.body.duration
    };
    if (!newMovie.poster) delete newMovie.poster;
    Movie.create(newMovie, (err, result) => {
        if (err) throw err;
        res.json('Created movie');
    });
});
    /*
        let form = req.body;
        check(form.title, validator, 'isAlphanumeric');
        check(form.poster, validator, 'isURL');
        check(form.genre, validator, 'isAlpha');
        check(form.duration, validator, 'isNumeric');
        let newMovie = new Movie ({
            title: form.title,
            poster: form.poster,
            genre: form.genre,
            duration: form.duration
        });
        newMovie.save((err) => {
            (err) ? console.log(err) : console.log('Inserted!');
        });
    */

//Show
router.get('/movies/:id', (req, res) => {
    var id = req.params.id;
    Movie.findById(id, (err, result) => {
        if (err) throw  err;
        res.json(result);
    });
});
//Edit
router.get('/movies/:id/edit', (req, res) => {
    var id = req.params.id;
    Movie.findById(id, (err, result) => {
        if (err) throw  err;
        res.render('movies/edit', {
            result
        });
    });
});
//Update
router.put('/movies/:id', (req, res) => {
    var updatedMovie = {
        $set: {
            title: req.body.title,
            poster: req.body.poster,
            genre: req.body.genre,
            duration: req.body.duration,
            releaseDate: req.body.releaseDate
        }
    }
    Movie.findByIdAndUpdate(req.params.id, updatedMovie, (err, result) => {
        if (err) throw err;
        res.redirect('/movies');
    });
});
//Delete
router.delete('/movies/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) throw err;
        console.log('Deleted!');
        res.redirect('/movies');
    });
});

//Add actor(s) to the Movie
router.get('/movies/:idm/:ida', (req, res) => {
    Movie.findById(req.params.idm, (err, foundMovie) => {
        if (err) throw err;
        Actor.findById(req.params.ida, (err, foundActor) => {
            if (err) throw err;
            foundMovie.actors.push(foundActor._id);
            foundMovie.save();
        });
    });
    res.redirect('/movies');
});




module.exports = router;