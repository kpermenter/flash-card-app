const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// middleware functions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// PUG templates
app.set('view engine', 'pug');

// require routes module
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// error handlers
app.use((req, res, next) => {
    const err = new Error('Not Found.');
    err.status = 404;
    next(err);
});

app.use((req, res, next) => {
    const err = new Error('Could not complete request.');
    err.status = 500;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// server
var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('The application is running!')
});
