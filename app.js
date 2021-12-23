const express = require('express');

const app = express();
app.use((req, res, next) => {
    console.log('Your requete is recieve');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({message: 'Your requete is recieve'});
    next();
});

app.use((req, res) => {
    console.log('The respond is sent with success');
});
module.exports = app;