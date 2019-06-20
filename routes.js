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

/* go to book page */
router.get('/bookX', function (req, res) {
  res.sendFile(pages + 'BookX.html');
});

/* retrieve book from db */
router.get('/book/:id', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  res.json(books[req.params.id]);
});

/* retrieve all review of book from db */
router.get('/bookReviews/:id', function (req, res) {
  let booksReviews = require(__dirname + '/public/assets/jsonFiles/booksReviews.json');
  res.json(booksReviews[req.params.id]);
});

/* retrieve all similar books of book from db */
router.get('/bookSimilar/:id', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/similarBooks.json');
  res.json(books[req.params.id]);
});

/* fetch all author's books */
router.get('/authorBooks/:authorID', function (req, res) {
  let authorBooks = require(__dirname + '/public/assets/jsonFiles/authorsBooks.json');
  res.json(authorBooks[req.params.authorID]);
});

/* retrieve all bestSellers from db */
router.get('/bestSellers', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* retrieve all Classics from db */
router.get('/classics', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* retrieve Our recommendations from db */
router.get('/ourRecommendations', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* retrieve Next Comings from db */
router.get('/nextComings', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

router.get('/bookX/:id/:from', function (req, res) {
  res.redirect('/bookX?id='+req.params.id+'&from='+req.params.from);
});

router.get('/bookX/:id/:from/:searchID', function (req, res) {
  res.redirect('/bookX?id='+req.params.id+'&from='+req.params.from+'&searchID='+req.params.searchID);
});


router.get('/contact', function (req, res) {
    res.sendFile(pages + 'Contact.html');
});

router.get('/author', function (req, res) {
    res.sendFile(pages + 'Author.html');
});

/* fetch author info */
router.get('/author/:id', function (req, res) {
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  res.json(authors[req.params.id]);
});

router.get('/authorX', function (req, res) {
   res.sendFile(pages + 'AuthorX.html');
});

router.get('/authorX/:id/:from', function (req, res) {
  res.redirect('/authorX?id='+req.params.id+'&from='+req.params.from);
});

router.get('/event', function (req, res){
   res.sendFile(pages + 'Event.html');
});

router.get('/eventX', function (req, res) {
   res.sendFile(pages + 'EventX.html');
});

router.get('/auth', function (req, res) {
    res.sendFile(pages + 'Authentication.html');
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