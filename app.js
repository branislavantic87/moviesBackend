const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//Requiring route files
const movieRoutes = require('./routes/movies');
const actorRoutes = require('./routes/actors');

mongoose.connect('mongodb://localhost/movie_app', {
    useMongoClient: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send('Hello CA!'));
app.use(movieRoutes);
app.use(actorRoutes);
app.get('*', (req, res) => {
    res.status(404);
    res.send('404 Page not found');
});

app.listen(8000, () => console.log('Server is running!'));