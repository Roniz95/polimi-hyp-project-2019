const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');
const _ = require("lodash");
const process = require("process");

let pages = path.join(__dirname, '/public/pages/');

/* HOME PAGE */
router.get('/', function(req, res ) {
  res.sendFile(pages  + 'index.html');
});

/* ABOUT US PAGE */
router.get('/about-us', function (req, res) {
  res.sendFile(pages + 'AboutUs.html');
});

/* CONTACT PAGE */
router.get('/contact', function (req, res) {
  res.sendFile(pages + 'Contact.html');
});

/* BOOK PAGE */
router.get('/book', function (req, res) {
   res.sendFile(pages + 'Book.html');
});

/* BOOKX PAGE */
router.get('/bookX', function (req, res) {
  res.sendFile(pages + 'BookX.html');
});

/* FETCH a specific book */
router.get('/book/:bookID', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  res.json(books[req.params.bookID]);
});

/* FETCH all reviews of a book */
router.get('/bookReviews/:bookID', function (req, res) {
  let booksReviews = require(__dirname + '/public/assets/jsonFiles/booksReviews.json');
  res.json(booksReviews[req.params.bookID]);
});

/* FETCH all similar books of a book */
router.get('/bookSimilar/:bookID', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/similarBooks.json');
  res.json(books[req.params.bookID]);
});

/* FETCH all author's books */
router.get('/authorBooks/:authorID', function (req, res) {
  let authorBooks = require(__dirname + '/public/assets/jsonFiles/authorsBooks.json');
  res.json(authorBooks[req.params.authorID]);
});

/* FETCH all BestSellers books */
router.get('/bestSellers', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* FETCH all Classics books */
router.get('/classics', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* FETCH all "our recommendations" books */
router.get('/ourRecommendations', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* FETCH all Next Comings books */
router.get('/nextComings', function (req, res) {
  let books = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(books);
});

/* FETCH all books whose title contains a specific string */
router.get('/searchBooksFromTitle/:title', function (req, res) {
  let results = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(results);
});

/* FETCH all books matching with filters (genre, author, theme, bestSellers, nextComings) */
router.get('/searchBooksFromFilters/:genre/:theme/:author/:bestSellers/:nextComings', function (req, res) {
  //Genre, Theme, Author: if == "null" (the string contains the word null) means that this filter is not being selected  
  //Best Sellers, NextComings: "0"(the string 0) means filter not selected, "1"(the string 1) means filter selected
  let results = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  res.json(results);
});

/* REDIRECT to bookX page from bookOfTheMonth, bestSellers, classics, ourRecommendations or nextComings */
router.get('/bookX/:bookID/:from', function (req, res) {
  res.redirect('/bookX?id='+req.params.bookID+'&from='+req.params.from);
});

/* REDIRECT to bookX page from similarBooks  or authorBooks (searchID needs for pagination system) */
router.get('/bookX/:bookID/:from/:searchID', function (req, res) {
  res.redirect('/bookX?id='+req.params.bookID+'&from='+req.params.from+'&searchID='+req.params.searchID);
});

/* REDIRECT to bookX page from searchfromTitle */
router.get('/bookTitle/:bookID/:title', function (req, res) {
  var from = "searchFromTitle";
  res.redirect('/bookX?id='+req.params.bookID+'&from='+from+'&title='+req.params.title);
});

/* REDIRECT to bookX page from searchfromFilters */
router.get('/bookFilters/:bookID/:genre/:author/:theme/:bs/:nc', function (req, res) {
  var from = "searchFromFilters";
  res.redirect('/bookX?id='+req.params.bookID+'&from='+from+'&genre='+req.params.genre+'&author='+req.params.author+'&theme='+req.params.theme+'&bs='+req.params.bs+'&nc='+req.params.nc);
});

/* AUTHOR PAGE */
router.get('/author', function (req, res) {
    res.sendFile(pages + 'Author.html');
});

/* AUTHORX PAGE */
router.get('/authorX', function (req, res) {
   res.sendFile(pages + 'AuthorX.html');
});

/* FETCH a specific author */
router.get('/author/:authorID', function (req, res) {
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  res.json(authors[req.params.authorID]);
});

/* FETCH all authors */
router.get('/authors', function (req, res) {
  let authors = require(__dirname + '/public/assets/jsonFiles/allAuthors.json');
  res.json(authors);
});

/* FETCH all authors whose name contains a specific string */
router.get('/authors/:name', function (req, res) {
  let authors = require(__dirname + '/public/assets/jsonFiles/allAuthors.json');
  res.json(authors);
});

/* FETCH all authors similar to another author */
router.get('/similarAuthors/:authorID', function (req, res) {
  let similarAuthors = require(__dirname + '/public/assets/jsonFiles/similarAuthors.json');
  res.json(similarAuthors[req.params.authorID]);
});

/* FETCH author infos for autocomplete plugin */
router.get('/autocomplete/authors', function (req, res) {
  let autocompleteAuthors = require(__dirname + '/public/assets/jsonFiles/autocompleteAuthors.json');
  res.json(autocompleteAuthors);
});

/* REDIRECT to authorX page from bookX or authorSearch */
router.get('/authorX/:authorID/:from', function (req, res) {
  res.redirect('/authorX?id='+req.params.authorID+'&from='+req.params.from);
});

/* ALL EVENTS PAGE */
router.get('/event', function (req, res){
   res.sendFile(pages + 'Event.html');
});

/* EVENTX PAGE */
router.get('/eventX', function (req, res) {
   res.sendFile(pages + 'EventX.html');
});

/* FETCH a specific event */
router.get('/event/:eventID', function (req, res){
  let events = require(__dirname + '/public/assets/jsonFiles/events.json'); 
  res.json(events[req.params.eventID]);
});

/* FETCH all books presented at the event */
router.get('/eventBook/:eventID', function (req, res){
  let eventsBooks = require(__dirname + '/public/assets/jsonFiles/eventsBooks.json'); 
  res.json(eventsBooks[req.params.eventID]);
});

/* REDIRECT to eventX page from all events, soonEvents or from bookEvents */
router.get('/eventX/:eventID/:from', function (req, res) {
  res.redirect('/eventX?id='+req.params.eventID+'&from='+req.params.from);
});

/* AUTHENTICATION PAGE */
router.get('/auth', function (req, res) {
  res.sendFile(pages + 'Authentication.html');
});

/* FETCH a specific user */
router.get('/users/:username', function (req, res){
  let users = require(__dirname + '/public/assets/jsonFiles/users.json'); 
  var user = users.filter(function(elem){ return elem.username===req.params.username })
  res.json(user);
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