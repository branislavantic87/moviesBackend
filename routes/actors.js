const express = require('express');
const router = express.Router();
const Actor = require('../models/actor');

router.get('/actors', (req, res) => {
    Actor.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

router.get('/actors', (req, res) => {
    res.render('actors/new');
})

router.post('/actors', (req, res) => {
    var actor = {
        name: req.body.name,
        surname: req.body.surname,
        photo: req.body.photo,
        age: req.body.age
    };
    Actor.create(actor, (err, result) => {
        if (err) throw err;
        console.log('Success!');
        res.redirect('/actors');
    });
});

//SHOW
router.get('/actors/:id', (req, res) => {
    var id = req.params.id;
    Actor.findById(id, (err, data) => {
        if (err) throw err;
       res.json(data);
    });
});

// Edit
router.get('/movies/:id/edit', (req, res) => {
    var id = req.params.id;
    Actor.findById(id, (err, result) => {
        if (err) throw err;
        res.render('actors/edit', {result} );
    });
});

//Update

router.put('/actors/:id', (req, res) => {
    var updateMovie = {
        $set: {
            name: req.params.name,
            surname: req.params.surname,
            photo: req.params.photo,
            age: req.params.age
        }
    }
    Actor.findByIdAndUpdate(req.params.id, updateMovie, (err, result) => {
        if (err) throw err;
        console.log("updated");
        res.redirect('/movies');
    });
});

// DELETE

router.delete('/actors/:id', (req, res) => {
    Actor.findOneAndRemove(req.params.id, (err, data) => {
        if (err) throw err;
        console.log("DELETED!!");
        res.json(data);
    });
});





module.exports = router;