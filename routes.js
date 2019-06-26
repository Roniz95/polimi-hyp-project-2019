const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');
const _ = require("lodash");
const process = require("process");
app = require('./index');
let pages = path.join(__dirname, '/public/pages/');


/*--------------------
  STATIC PAGES PART
---------------------*/

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




/*-------------------
  BOOKS PAGES PART
---------------------*/

/* BOOK PAGE */
router.get('/book', function (req, res) {
   res.sendFile(pages + 'Book.html');
});

/* BOOKX PAGE */
router.get('/bookX', function (req, res) {
  res.sendFile(pages + 'BookX.html');
});

/* FETCH a specific book */
router.get('/book/:bookISBN', function (req, res) {
  var isbn = parseInt(req.params.bookISBN);
  /*
    SELECT *
    FROM books
    WHERE books.isbn = isbn
  */
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  var book = books.filter(function(elem){ return elem.isbn==isbn });
  res.json(book[0]);
});

/* FETCH all book's authors */
router.get('/bookAuthors/:bookISBN', function (req, res) {
  var isbn = parseInt(req.params.bookISBN);
  /*
    SELECT authors.id, authors.name
    FROM authors
    WHERE 
      authors.id = (SELECT author1_id FROM authorsOf WHERE authorsOf.isbn=isbn) ||
      authors.id = (SELECT author2_id FROM authorsOf WHERE authorsOf.isbn=isbn) ||
      authors.id = (SELECT author3_id FROM authorsOf WHERE authorsOf.isbn=isbn) ||
      authors.id = (SELECT author4_id FROM authorsOf WHERE authorsOf.isbn=isbn)
  */
  let bookAuths = require(__dirname + '/public/assets/jsonFiles/authorsOf.json');
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  var bookAuthors = bookAuths.filter( function(elem){ return elem.isbn==isbn });
  let auth1ID = bookAuthors[0].author1_id.toString();
  var authsList = authors.filter(
    function(elem){ 
      return (
        (bookAuthors[0].author1_id>=0 && elem.id===bookAuthors[0].author1_id) ||
        (bookAuthors[0].author2_id>=0 && elem.id===bookAuthors[0].author2_id) ||
        (bookAuthors[0].author3_id>=0 && elem.id===bookAuthors[0].author3_id) ||
        (bookAuthors[0].author4_id>=0 && elem.id===bookAuthors[0].author4_id)
      );
  });
  res.json(authsList);
});

/* FETCH all book's themes */
router.get('/bookThemes/:bookISBN', function (req, res) {
  var isbn = parseInt(req.params.bookISBN);
  /*
    SELECT themes.value
    FROM themes, 
    INNER JOIN bookThemes ON themes.data = bookThemes.idTheme
    WHERE bookThemes.isbn = isbn;
  */
  let booksThemes = require(__dirname + '/public/assets/jsonFiles/bookThemes.json');
  let themes = require(__dirname + '/public/assets/jsonFiles/themes.json');
  var bookThemes = booksThemes.filter( function(elem){ return elem.isbn==isbn });
  function foo(themeID, list){
    for(let i=0; i<list.length; i++){ if(list[i].idTheme==themeID) return true;  }
    return false;
  }
  var themesList = themes.filter( function(elem){ return foo(elem.data, bookThemes); });
  res.json(themesList);
});

/* FETCH all reviews of a book */
router.get('/bookReviews/:bookISBN', function (req, res) {
  var isbn = parseInt(req.params.bookISBN);
  /*
    SELECT *
    FROM bookReviews
    WHERE bookReviews.isbn=isbn
  */
  let booksReviews = require(__dirname + '/public/assets/jsonFiles/booksReviews.json');
  var reviewsList = booksReviews.filter( function(elem){ return elem.isbn==isbn });
  res.json(reviewsList);
});

/* FETCH all similar books of a book */
router.get('/bookSimilar/:bookISBN', function (req, res) {
  var isbn = parseInt(req.params.bookISBN);
  /*
    SELECT *
    FROM books
    WHERE books.isbn IN (SELECT similarBooks.similarISBN FROM similarBooks WHERE similarBooks.isbn=isbn)
  */
  let similarBooks = require(__dirname + '/public/assets/jsonFiles/similarBooks.json');
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  var similarISBNs = similarBooks.filter( function(elem) { return elem.isbn==isbn });
  function foo(isbn, similarlist){
    for(let i=0; i<similarlist.length; i++){ if(similarlist[i].similarISBN==isbn){ return true } }
    return false;
  }
  var booksList = books.filter( function(elem) { return foo(elem.isbn, similarISBNs); });
  res.json(booksList);
});

/* FETCH all author's books */
router.get('/authorBooks/:authorID', function (req, res) {
  var authorID = parseInt(req.params.authorID);
  /*
    SELECT books.isbn, books.title, books.image
    FROM books
    WHERE books.isbn IN (
      SELECT authorsOf.isbn FROM authorsOf
      WHERE (
        authorsOf.author1_id=authorID ||
        authorsOf.author2_id=authorID ||
        authorsOf.author3_id=authorID ||
        authorsOf.author4_id=authorID
      )
    )
  */
  let authorsOf = require(__dirname + '/public/assets/jsonFiles/authorsOf.json');
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  var authorBooks = authorsOf.filter(
    function(elem){ 
      return ( 
        (elem.author1_id>=0 && elem.author1_id===authorID) || 
        (elem.author2_id>=0 && elem.author2_id===authorID) ||
        (elem.author3_id>=0 && elem.author3_id===authorID) || 
        (elem.author4_id>=0 && elem.author4_id===authorID)
      ) 
    }
  );
  function foo(isbn, list){
    for(let i=0; i<list.length; i++){ if(list[i].isbn===isbn){ return true; } }
    return false;
  }
  var booksList = books.filter( function(elem) { return foo(elem.isbn, authorBooks); } );
  res.json(booksList);
});

/* FETCH all BestSellers books */
router.get('/bestSellers', function (req, res) {
  /*
    SELECT books.isbn, books.title, books.image
    FROM books
    WHERE books.isbn IN (SELECT bestSellers.isbn FROM bestSellers)
  */
  let bestSellers = require(__dirname + '/public/assets/jsonFiles/bestSellers.json');
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  function foo(isbn, list){
    for(let i=0; i<list.length; i++){ if(list[i].isbn==isbn) return true }
    return false;
  }
  var booksList = books.filter( function(elem){ return foo(elem.isbn, bestSellers) });
  res.json(booksList);
});

/* FETCH all Classics books */
router.get('/classics', function (req, res) {
  /*
    SELECT books.isbn, books.title, books.image
    FROM books
    WHERE books.isbn IN (SELECT classics.isbn FROM classics)
  */
  let classics = require(__dirname + '/public/assets/jsonFiles/classics.json');
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  function foo(isbn, list){
    for(let i=0; i<list.length; i++){ if(list[i].isbn==isbn) return true }
    return false;
  }
  var booksList = books.filter( function(elem){ return foo(elem.isbn, classics) });
  res.json(booksList);
});

/* FETCH all "our recommendations" books */
router.get('/ourRecommendations', function (req, res) {
  /*
    SELECT books.isbn, books.title, books.image
    FROM books
    WHERE books.isbn IN (SELECT ourRecommendations.isbn FROM ourRecommendations)
  */
  let ourRecommendations = require(__dirname + '/public/assets/jsonFiles/ourRecommendations.json');
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  function foo(isbn, list){
    for(let i=0; i<list.length; i++){ if(list[i].isbn==isbn) return true }
    return false;
  }
  var booksList = books.filter( function(elem){ return foo(elem.isbn, ourRecommendations) });
  res.json(booksList);
});

/* FETCH all New Releases books */
router.get('/newReleases', function (req, res) {
  /*
    SELECT books.isbn, books.title, books.image
    FROM books
    WHERE books.publishingDate > DATE(data del mese scorso, dal primo giono) 
    (in sostanza i libri pubblicati da massimo il mese scorso ad oggi)
  */
  var date = new Date("01-01-2016"); //Messa a caso perchè al momento non ho ancora inserito libri più nuovi
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  var booksList = books.filter( function(elem){ return new Date(elem.publishingDate)>date });
  res.json(booksList);
});

/* FETCH all books whose title contains a specific string */
router.get('/searchBooksFromTitle/:title', function (req, res) {
  /*
    SELECT books.isbn, books.title, books.image
    FROM books
    WHERE books.title LIKE %req.params.title%
  */
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  var booksList = books.filter(function(elem){ return elem.title.includes(req.params.title) });
  res.json(booksList);
});

/* FETCH all books matching with filters (genre, author, theme, bestSellers, nextComings) */
router.get('/searchBooksFromFilters/:genre/:theme/:author/:bestSellers/:newReleases', function (req, res) {
  //Genre, Theme, Author: if == "null" (the string contains the word null) means that this filter is not being selected  
  //Best Sellers, NewReleases: "0"(the string 0) means filter not selected, "1"(the string 1) means filter selected
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  res.json(books);
});

/* REDIRECT to bookX page from bookOfTheMonth, bestSellers, classics, ourRecommendations or nextComings */
router.get('/bookX/:bookISBN/:from', function (req, res) {
  res.redirect('/bookX?isbn='+req.params.bookISBN+'&from='+req.params.from);
});

/* REDIRECT to bookX page from similarBooks, authorBooks or eventBooks (searchID needs for pagination system) */
router.get('/bookX/:bookISBN/:from/:searchISBN', function (req, res) {
  res.redirect('/bookX?isbn='+req.params.bookISBN+'&from='+req.params.from+'&searchISBN='+req.params.searchISBN);
});

/* REDIRECT to bookX page from searchfromTitle */
router.get('/bookTitle/:bookISBN/:title', function (req, res) {
  var from = "searchFromTitle";
  res.redirect('/bookX?isbn='+req.params.bookISBN+'&from='+from+'&title='+req.params.title);
});

/* REDIRECT to bookX page from searchfromFilters */
router.get('/bookFilters/:bookISBN/:genre/:author/:theme/:bs/:nc', function (req, res) {
  var from = "searchFromFilters";
  res.redirect('/bookX?isbn='+req.params.bookISBN+'&from='+from+'&genre='+req.params.genre+'&author='+req.params.author+'&theme='+req.params.theme+'&bs='+req.params.bs+'&nc='+req.params.nc);
});




/*--------------------
  AUTHOR PAGES PART
----------------------*/

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
  var authID = parseInt(req.params.authorID);
  /*
    SELECT * 
    FROM authors
    WHERE authors.id = authID 
  */
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  var author = authors.filter(function(elem){ return elem.id===authID })
  res.json(author[0]);
});

/* FETCH all authors */
router.get('/authors', function (req, res) {
  /*
    SELECT authors.id, authors.name, authors.image
    FROM authors
  */
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  res.json(authors);
});

/* FETCH all authors whose name contains a specific string */
router.get('/authors/:name', function (req, res) {
  /*
    SELECT authors.id, authors.name, authors.image
    FROM authors
    WHERE authors.name LIKE %req.params.name%
  */
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  var authsList = authors.filter(function(elem){ return elem.name.includes(req.params.name) });
  res.json(authsList);
});

/* FETCH all authors similar to another author */
router.get('/similarAuthors/:authorID', function (req, res) {
  var authID = parseInt(req.params.authorID);
  /* 
    SELECT authors.id, authors.name, authors.image 
    FROM authors
    WHERE 
      authors.id = (SELECT similarAuthors.similar1 FROM similarAuthors WHERE similarAuthors.id == authID) ||
      authors.id = (SELECT similarAuthors.similar2 FROM similarAuthors WHERE similarAuthors.id == authID) ||
      authors.id = (SELECT similarAuthors.similar3 FROM similarAuthors WHERE similarAuthors.id == authID) ||
      authors.id = (SELECT similarAuthors.similar4 FROM similarAuthors WHERE similarAuthors.id == authID) ||
      authors.id = (SELECT similarAuthors.similar5 FROM similarAuthors WHERE similarAuthors.id == authID) ||
      authors.id = (SELECT similarAuthors.similar6 FROM similarAuthors WHERE similarAuthors.id == authID) ||
      authors.id = (SELECT similarAuthors.similar7 FROM similarAuthors WHERE similarAuthors.id == authID) ||
  */
  let similarAuthors = require(__dirname + '/public/assets/jsonFiles/similarAuthors.json');
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  var authsList = similarAuthors.filter(function(elem){ return elem.id==authID }); 
  var results = [];
  results[0] = authors.filter(function(elem){ return elem.id===authsList[0].similar1 })[0];
  results[1] = authors.filter(function(elem){ return elem.id===authsList[0].similar2 })[0];
  results[2] = authors.filter(function(elem){ return elem.id===authsList[0].similar3 })[0];
  results[3] = authors.filter(function(elem){ return elem.id===authsList[0].similar4 })[0];
  results[4] = authors.filter(function(elem){ return elem.id===authsList[0].similar5 })[0];
  results[5] = authors.filter(function(elem){ return elem.id===authsList[0].similar6 })[0];
  results[6] = authors.filter(function(elem){ return elem.id===authsList[0].similar7 })[0];
  res.json(results);
});

/* REDIRECT to authorX page from authorOfTheMonth or authorSearch */
router.get('/authorX/:authorID/:from', function (req, res) {
  res.redirect('/authorX?id='+req.params.authorID+'&from='+req.params.from);
});

/* REDIRECT to authorX page from bookX, similarAuthors or eventAuthors */
router.get('/authorX/:authorID/:from/:searchID', function (req, res) {
  res.redirect('/authorX?id='+req.params.authorID+'&from='+req.params.from+'&searchID='+req.params.searchID);
});




/*-------------------
  EVENTS PAGES PART
---------------------*/

/* ALL EVENTS PAGE */
router.get('/event', function (req, res){
   res.sendFile(pages + 'Event.html');
});

/* EVENTX PAGE */
router.get('/eventX', function (req, res) {
   res.sendFile(pages + 'EventX.html');
});

/* FETCH all events */
router.get('/events', function (req, res){
  /*
    SELECT *
    FROM events
  */
  let events = require(__dirname + '/public/assets/jsonFiles/events.json');
  res.json(events);
});

/* FETCH a specific event */
router.get('/event/:eventID', function (req, res){
  var eventID = parseInt(req.params.eventID);
  /*
    SELECT *
    FROM events
    WHERE events.id = eventID
  */
  let events = require(__dirname + '/public/assets/jsonFiles/events.json');
  var event = events.filter( function(elem) { return elem.id===eventID } )
  res.json(event[0]);
});

/* FETCH all books of a specific event */
router.get('/booksEvent/:eventID', function (req, res){
  var eventID = parseInt(req.params.eventID);
  /*
    SELECT books.isbn, books.title, books.image
    FROM books, eventsBooks
    WHERE eventsBooks.eventID = eventID AND books.isbn = eventsBooks.bookISBN
  */
  let eventsBooks = require(__dirname + '/public/assets/jsonFiles/eventsBooks.json');
  let books = require(__dirname + '/public/assets/jsonFiles/books.json');
  var eventBooks = eventsBooks.filter( function(elem) { return elem.eventID==eventID; } );
  function foo(isbn, list){
    for(let i=0; i<list.length; i++){ if(list[i].bookISBN==isbn){ return true; } }
    return false;
  }
  var booksList = books.filter( function(elem) { return foo(elem.isbn, eventBooks); } )
  res.json(booksList);
});

/* FETCH all authors of a specific event */
router.get('/authorsEvent/:eventID', function (req, res){
  var eventID = parseInt(req.params.eventID);
  /*
    SELECT authors.id, authors.name, authors.image
    FROM authors, eventsAuthors
    WHERE eventsBooks.eventID = eventID AND authors.id = eventsAuthors.authorID
  */
  let eventsAuthors = require(__dirname + '/public/assets/jsonFiles/eventsAuthors.json');
  let authors = require(__dirname + '/public/assets/jsonFiles/authors.json');
  var eventAuthors = eventsAuthors.filter( function(elem) { return elem.eventID==eventID; } );
  function foo(id, list){
    for(let i=0; i<list.length; i++){ if(list[i].authorID==id){ return true; } }
    return false;
  }
  var authorsList = authors.filter( function(elem) { return foo(elem.id, eventAuthors); } )
  res.json(authorsList);
});

/* FETCH the next two weeks' events */
router.get('/soonEvents', function (req, res){
  /*
    SELECT *
    FROM events
    WHERE events.date > OGGI AND events.date < 2 settimane  */
  let events = require(__dirname + '/public/assets/jsonFiles/events.json');
  var today = new Date();
  var twoWeeksLater = new Date().setDate(today.getDate()+15); 
  var eventsList = events.filter( function(elem) { return (new Date(elem.date)>=today && new Date(elem.date)<=twoWeeksLater); } )
  res.json(eventsList);
});

/* FETCH this month's events */
router.get('/monthEvents', function (req, res){
  /*
    SELECT *
    FROM events
    WHERE new Date(events.date).getFullYear() = new Date().getFullYear() AND new Date(events.date).getMonth() = new Date().getMonth()
  */
  let events = require(__dirname + '/public/assets/jsonFiles/events.json');
  var today = new Date();
  var eventsList = events.filter( 
    function(elem) { 
      return (
        new Date(elem.date).getFullYear() == today.getFullYear() && 
        new Date(elem.date).getMonth() == today.getMonth()
      ); 
    } 
  )
  res.json(eventsList);
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




/*--------------------------
  AUTHENTICATION PAGE PART
----------------------------*/

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




/*--------------------
  AUTOCOMPLETE PART
---------------------*/

/* FETCH author infos for AUTOCOMPLETE plugin */
router.get('/autocomplete/authors', function (req, res) {
  let autocompleteAuthors = require(__dirname + '/public/assets/jsonFiles/autocompleteAuthors.json');
  res.json(autocompleteAuthors);
});

/* FETCH genre infos for AUTOCOMPLETE plugin */
router.get('/autocomplete/genres', function (req, res) {
  let autocompleteGenres = require(__dirname + '/public/assets/jsonFiles/autocompleteGenres.json');
  res.json(autocompleteGenres);
});

/* FETCH themes infos for AUTOCOMPLETE plugin */
router.get('/autocomplete/themes', function (req, res) {
  let autocompleteThemes = require(__dirname + '/public/assets/jsonFiles/autocompleteThemes.json');
  res.json(autocompleteThemes);
});




/*---------------
  OTHER PART
----------------*/

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