const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');
const _ = require("lodash");
const process = require("process");

let pages = path.join(__dirname, '/public/pages/');

//these are the endpoint for the pages, you need to use these for html href link (for example #href=/about-us)
router.get('/', function(req, res ) {
    res.sendFile(pages  + 'index.html');
});

router.get('/about-us', function (req, res) {
    res.sendFile(pages + 'AboutUs.html');
});

router.get('/book', function (req, res) {
   res.sendFile(pages + 'Book.html');
});

router.get('/bookX', function (req, res) {
   res.sendFile(pages + 'BookX.html');
});

router.get('/contact', function (req, res) {
    res.sendFile(pages + 'Contact.html');
});
router.get('/author', function (req, res) {
    res.sendFile(pages + 'Author.html');
});

router.get('/authorX', function (req, res) {
   res.sendFile(pages + 'AuthorX.html');
});

router.get('/event', function (req, res){
   res.sendFile(pages + 'Event.html');
});

router.get('/eventX', function (req, res) {
   res.sendFile(pages + 'EventX.html');
});

router.get('/backend/main.html', function (req, res){
    res.sendFile(pages + 'main.html')
});

router.get('/backend/spec.yaml', function (req, res) {

});

//handle 404
router.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(pages + '404page.html', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

module.exports = router;