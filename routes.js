const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');
const _ = require("lodash");
const process = require("process");
const common = require("./common");
app = require('./index');
let pages = path.join(__dirname, '/public/pages/');


/*--------------------
  STATIC PAGES PART
---------------------*/

/* HOME PAGE */
router.get('/', function (req, res) {
    res.sendFile(pages + 'index.html');
});

/* ABOUT US PAGE */
router.get('/about-us', function (req, res) {
    res.sendFile(pages + 'AboutUs.html');
});

/* CONTACT PAGE */
router.get('/contact', function (req, res) {
    res.sendFile(pages + 'Contact.html');
});

/* ORDERING AND SHIPPING INFO PAGE */
router.get('/infos', function (req, res) {
    res.sendFile(pages + 'Info.html');
});

/* CART PAGE */
router.get('/cart', function (req, res) {
    res.sendFile(pages + 'Cart.html');
});


/*-------------------
  BOOKS PAGES PART
---------------------*/

/* BOOK PAGE */

//returns all the books if no query parameters are specified,
//else returns the filters sets obtained by query parameters
//parameters : ['title', 'isBestSeller'. 'isRecommended', 'isClassic', 'author', 'theme', 'genre']

router.get('/books', function (req, res) {
    let errorList = [];
    let query = res.app.sqlDB('books').select('books.*');
    //if title is not null, then select by title
    if (typeof req.query.title != "undefined") {

        let title = '%' + req.query.title + '%';
        query.whereRaw('LOWER(title) LIKE ?', [title])

    }
    if (typeof req.query.isBestSeller != "undefined") {
        if (typeof req.query.isBestSeller != "boolean") {
            errorList.push(common.error("badQuery", 'isBestSeller'));
        } else {
            query.where('isBestSeller', req.query.isBestSeller);

        }
    }
    if (typeof req.query.isNewRelease != "undefined") {
        if (!common.isParamValid('isNewRelease', req.params.isNewRelease)) {
            errorList.push(common.error("badQuery", 'isNewRelease'))
        } else {
            query.where('isNewRelease', req.query.isNewRelease);
        }
    }
    if (typeof req.query.isRecommended != 'undefined') {
        if (!common.isParamValid('isRecommended', req.query.isRecommended)) {
            errorList.push(common.error("badQuery", 'isRecommended'))
        } else {
            query.where('isRecommended', req.query.isRecommended)
        }
    }
    if (typeof req.query.isClassic != 'undefined') {
        if (!common.isParamValid('isClassic', req.query.isClassic)) {
            errorList.push(common.error('badQuery', 'isClassic'))
        } else {
            query.where('isClassic', req.query.isClassic)

        }
    }

    if (typeof req.query.author != "undefined") {
        if (!common.isParamValid('id', req.query.author)) {
            errorList.push(common.error('badQuery', 'author'))
        } else {
            query.leftJoin('authorsOf', 'books.isbn', 'author.isbn')
                .where('authorID', req.query.authorID)
        }

    }

    if (typeof req.query.theme != "undefined") {
        if (!common.isParamValid('id', req.query.theme)) {
            errorList.push(common.error('badQuery', 'theme'))
        } else {
            query.leftJoin('bookThemes', 'books.isbn', 'bookThemes.isbn')
                .where('bookThemes.IDTheme', req.query.theme)
        }

    }

    if (typeof req.query.genre != "undefined") {
        if (!common.isParamValid('id', req.query.genre))
            query.leftJoin('bookGenres', 'books.isbn', 'bookGenres.isbn')
                .where('bookGenres.genreID', req.query.genre)
    }


    console.log(query.toString());
    if (errorList.length !== 0) {
        res.status(422).send(errorList);
    } else {
        query.then(filteredBooks => res.send(filteredBooks));
    }
});

//select a specific book
router.get('/books/:isbn', function (req, res) {
    if (!common.isParamValid('isbn', req.params.isbn)) {
        res.status(422).json([common.error('badParameter', 'isbn', req.params.isbn)])
    } else {
        res.app.sqlDB('books')
            .where('isbn', req.params.isbn)
            .then(book => {
                //the resource doesn't exist
                if (book.length === 0) {
                    res.status(404).send(common.error('noExist', req.url))
                } else {
                    res.status(200).send(book);
                }
            });
    }

});

//GET all authors of a book
router.get('/books/:isbn/authors', function (req, res) {
    if (!common.isParamValid('isbn', req.params.isbn)) {
        res.status(422).json([common.error('badParameter', 'isbn', req.params.isbn)])
    } else {
        res.app.sqlDB('authors').select('authors.*')
            .leftJoin('authorsOf', 'authors.id', "authorsOf.authorID")
            .where('authorsOf.isbn', req.params.isbn)
            .then(authors =>
                authors ? res.send(authors) : res.status(400)
                    .send([common.error('serverError')]))
    }

});

//GET all themes of a book
router.get('/books/:isbn/themes', function (req, res) {
    if (!common.isParamValid('isbn', req.params.isbn)) {
        res.status(422).json([common.error('badParameter', 'isbn', req.params.isbn)])
    } else {
        res.app.sqlDB('themes')
            .select('themes.*')
            .leftJoin('bookThemes', 'themes.data', 'bookThemes.IDTheme')
            .where('bookThemes.isbn', req.params.isbn)
            .then(themes =>
                themes ? res.send(themes) : res.status(400)
                    .send([common.error("serverError")]))
    }

});

//GET all review of a book
router.get('/books/:isbn/reviews', function (req, res) {
    if (!common.isParamValid('isbn', req.params.isbn)) {
        res.status(422).json([common.error('badParameter', 'isbn', req.params.isbn)])
    } else {
        res.app.sqlDB('reviews').select('reviews.*')
            .where('reviews.isbn', req.params.isbn)
            .then(reviews => res.send(reviews))
    }

});

//GET all books similar to the book with this isbn
router.get('/books/:isbn/similar', function (req, res) {
    if (!common.isParamValid('isbn', req.params.isbn)) {
        res.status(422).json([common.error('badParameter', 'isbn', req.params.isbn)])
    } else {
        res.app.sqlDB('books').select('books.*')
            .leftJoin('similarBooks', 'books.isbn', 'similarBooks.similarISBN')
            .where('similarBooks.isbn', req.params.isbn)
            .then(books => res.send(books))
    }

});

/* BOOKX PAGE */
router.get('/books/book', function (req, res) {
    res.sendFile(pages + 'BookX.html');
});

/* REDIRECT to bookX page from bookOfTheMonth, bestSellers, classics, ourRecommendations or nextComings */
router.get('/bookX/:bookISBN/:from', function (req, res) {
    res.redirect('/bookX?isbn=' + req.params.bookISBN + '&from=' + req.params.from);
});

/* REDIRECT to bookX page from similarBooks, authorBooks or eventBooks (searchID needs for pagination system) */
router.get('/bookX/:bookISBN/:from/:searchISBN', function (req, res) {
    res.redirect('/bookX?isbn=' + req.params.bookISBN + '&from=' + req.params.from + '&searchISBN=' + req.params.searchISBN);
});

/* REDIRECT to bookX page from searchfromTitle */
router.get('/bookTitle/:bookISBN/:title', function (req, res) {
    var from = "searchFromTitle";
    res.redirect('/bookX?isbn=' + req.params.bookISBN + '&from=' + from + '&title=' + req.params.title);
});

/* REDIRECT to bookX page from searchfromFilters */
router.get('/bookFilters/:bookISBN/:genre/:author/:theme/:bs/:nc', function (req, res) {
    var from = "searchFromFilters";
    res.redirect('/bookX?isbn=' + req.params.bookISBN + '&from=' + from + '&genre=' + req.params.genre + '&author=' + req.params.author + '&theme=' + req.params.theme + '&bs=' + req.params.bs + '&nc=' + req.params.nc);
});


/*--------------------
  AUTHOR PAGES PART
----------------------*/

//get all authors
router.get('/authors', function (req, res) {
    let errorList = [];
    let query = res.app.sqlDB('authors');
    if (typeof req.query.name != "undefined") {
        if (!common.isParamValid("alphString", 'name')) {
            errorList.push(common.error('badParameter', 'name'))
        } else {
            let authorName = req.query.name.toLowerCase();
            query.whereRaw('LOWER(name) LIKE ?', ['%' + authorName + '%'])
        }

    }
    if (errorList.length === 0) {
        query.then(authors => res.send(authors));
    } else {
        res.status(422).send(errorList);
    }

});

//GET author from id
router.get('/authors/:id', function (req, res) {
    if (!common.isParamValid('id', req.params.id)) {
        res.status(422).send([common.error('badParameter', 'id')])
    } else {
        res.app.sqlDB('authors')
            .where('id', req.params.id)
            .then(author => res.send(author))
    }

});

//GET all author books by author id
router.get('/authors/:id/books', function (req, res) {
    if (!common.isParamValid('id', req.params.id)) {
        res.status(422).send([common.error('badParameter', 'id')])
    } else {
        res.app.sqlDB('books').select('books.*')
            .leftJoin('authorsOf', 'books.isbn', 'authorsOf.isbn')
            .where('authorsOf.authorID', req.params.id)
            .then(books => res.send(books))
    }


});

//GET all authors similar to this one
router.get('/authors/:id/similar', function (req, res) {
    if (!common.isParamValid('id', req.params.id)) {
        res.status(422).send([common.error('badParameter', 'id')])
    } else {
        res.app.sqlDB('similarAuthors').select('authors.*')
            .where('similarAuthors.id', req.params.id)
            .rightJoin('authors', 'authors.id', 'similarAuthors.similarID')
            .then(authors => res.send(authors))
    }

});

/* AUTHORX PAGE */
router.get('/authors/author', function (req, res) {
    res.sendFile(pages + 'AuthorX.html');
});


/* REDIRECT to authorX page from authorOfTheMonth or authorSearch */
router.get('/authorX/:authorID/:from', function (req, res) {
    res.redirect('/authorX?id=' + req.params.authorID + '&from=' + req.params.from);
});

/* REDIRECT to authorX page from bookX, similarAuthors or eventAuthors */
router.get('/authorX/:authorID/:from/:searchID', function (req, res) {
    res.redirect('/authorX?id=' + req.params.authorID + '&from=' + req.params.from + '&searchID=' + req.params.searchID);
});


/*-------------------
  EVENTS PAGES PART
---------------------*/
//TODO make the date filters works
//GET events filtered by date, if no query parameters are present, return all events
router.get('/events', function (req, res) {
    let query = res.app.sqlDB('events')


    if (typeof req.query.fromDate != "undefined") {
        query.where("date", ">=", req.query.fromDate)
    }
    if (typeof req.query.toDate != "undefined") {
        query.where('date', "<=", req.query.toDate)
    }

    query.then(events => res.send(events))
});

//GET a specific event
router.get('/events/:id', function (req, res) {
    if(!common.isParamValid('id', req.params.id)) {
        res.status(422).send(common.error('badParameter', 'id'))
    } else {
        res.app.sqlDB('events')
            .where('id', req.params.id)
            .then(event => res.send(event))
    }

});

//GET all books of an event
router.get('/events/:id/books', function (req, res) {
    if(!common.isParamValid('id', req.params.id)) {
        res.status(422).send(common.error('badParameter', 'id'))
    } else {
        res.app.sqlDB('books').select('books.*')
            .leftJoin('eventsBooks', 'books.isbn', 'eventsBooks.isbn')
            .where('eventsBooks.eventID', req.params.id)
            .then(booksOfEvent => res.send(booksOfEvent))
    }

});

//GET all authors of a specific event
router.get('/events/:id/authors', function (req, res) {
    if(!common.isParamValid('id', req.params.id)) {
        res.status(422).send(common.error('badParameter', 'id'))
    } else {
        res.app.sqlDB('authors').select('authors.*')
            .leftJoin('eventsAuthors', 'authors.id', 'eventsAuthors.authorID')
            .where('eventsAuthors.eventID', req.params.id)
            .then(eventAuthors => res.send(eventAuthors))
    }

});

//TODO the next two get should be integrated inside /events
router.get('/events/soon', function (req, res) {
    var today = new Date();
    var twoWeeksLater = new Date().setDate(today.getDate() + 15);
    res.app.sqlDB('events')
        .where('start', '>=', today)
        .andWhere('end', '<=', twoWeeksLater)
        .then(soonEvents => res.send(soonEvents));
});


router.get('/events/month', function (req, res) {


});

/* REDIRECT to eventX page from all events or soonEvents */
router.get('/eventX/:eventID/:from', function (req, res) {
    res.redirect('/eventX?id=' + req.params.eventID + '&from=' + req.params.from);
});

/* REDIRECT to eventX page from bookEvents */
router.get('/eventX/:eventID/:from/:bookISBN', function (req, res) {
    res.redirect('/eventX?id=' + req.params.eventID + '&from=' + req.params.from + '&bookISBN=' + req.params.bookISBN);
});


/*--------------------------
  AUTHENTICATION PAGE PART
----------------------------*/

/* AUTHENTICATION PAGE */
router.get('/auth', function (req, res) {
    res.sendFile(pages + 'Authentication.html');
});

/* FETCH a specific user */
router.get('/users/:username', function (req, res) {
    res.app.sqlDB('users')
        .where('username', req.params.username)
        .then(user => res.send(user))
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

router.get('/backend/main.html', function (req, res) {
    res.sendFile(pages + 'main.html')
});

router.get('/backend/apidoc.yml', function (req, res) {

});

//handle 404
router.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(pages + '404page.html', {url: req.url});
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({error: 'Not found'});
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});


module.exports = router;