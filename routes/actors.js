const express = require('express');
const router = express.Router();
const Actor = require('../models/actor');

router.get('/actors', (req, res) => {
    Actor.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

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







module.exports = router;