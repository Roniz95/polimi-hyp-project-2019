const passport = require('passport');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require('./routes.js');
const _ = require("lodash");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const knex = require('./public/common/knexConfig').knexConn();

const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
    app.use(express.static('public'));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());



//swagger 2.0 setup
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'hypermedia projerct',
            description: 'api documentation for the hypermedia project 2019',
            contact: {
               email: 'sergioplacanica95.rc@gmail.com'
            },
            version: '1.0.0',
        },
        basePath: '/',
    },
    apis: ['./public/pages/apidoc.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/backend/swaggerui', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);
app.use(express.static(__dirname + '/public/assets'));

let jsonPath = __dirname + "/public/assets/jsonFiles/";

//------------variables that stores json----------
let booksList = require(jsonPath + 'books.json');
let authorsList = require(jsonPath + 'authors.json');
let authorsOfList = require(jsonPath + "authorsOf.json");
let eventsList = require(jsonPath + 'events.json');
let eventsBooksList = require(jsonPath + 'eventsBooks.json');
let eventsAuthorList = require(jsonPath + 'eventsAuthors.json');
let usersList = require( jsonPath + 'users.json');
let themesList = require(jsonPath + 'themes.json');
let similarBooksList = require(jsonPath + 'similarBooks.json');
let similarAuthorsList = require(jsonPath + 'similarAuthors.json');
let reviewsList = require(jsonPath + 'booksReviews.json');
let genresList = require(jsonPath + 'genres.json');
let bookGenresList = require(jsonPath + 'bookGenres.json');
let bookThemesList = require(jsonPath + 'bookThemes.json');


router.get('/test', function (req, res) {

})

function createDB() {
    knex.schema.hasTable("books").then(exist => {
        if (!exist) {
            knex.schema.createTable("books", table => {
                table.string('isbn').primary();
                table.string('title');
                table.date('publishingDate');
                table.string('publishingHouse');
                table.string('image');
                table.text('abstract');
                table.text('authorInterview');
                table.float('price', 2);
                table.boolean('isBestSeller');
                table.boolean('isClassic');
                table.boolean('isRecommended');
                table.boolean('isNewRelease');

            })
                .then(() => {
                    return Promise.all(
                        _.map(booksList, b => {
                            return knex("books").insert(b);
                        })
                    );
                });

        }
    });

    knex.schema.hasTable("authors").then(exist => {
        if (!exist) {
            knex.schema.createTable("authors", table => {
                table.increments('id').primary();
                table.string('name');
                table.string('image');
                table.string('link');
                table.text('bio');
            })
                .then(() => {
                    return Promise.all(
                        _.map(authorsList, a => {
                            return knex("authors").insert(a);
                        })
                    );
                });
        }
    });

    knex.schema.hasTable("authorsOf").then(exist => {
        if (!exist) {
            knex.schema.createTable("authorsOf", table => {
                table.string('isbn');
                table.integer('authorID');
                table.primary(['isbn', 'authorID'])

            })
                .then(() => {
                    return Promise.all(
                        _.map(authorsOfList, a => {
                            return knex("authorsOf").insert(a)
                        })
                    )
            })
        }
    });

    knex.schema.hasTable("events").then(exist => {
        if (!exist) {
            knex.schema.createTable('events', table => {
                table.increments('id').primary();
                table.string('title');
                table.timestamp('date', { useTz: false });
                table.text('mapSrc');
                table.string('address');
                table.string('phoneNumber');
                table.string('mail');
                table.string('start');
                table.string('end');
                table.string('image');
                table.text('description');
            }).then(() => {
                return Promise.all(
                    _.map(eventsList, e => {
                        return (knex('events').insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("eventsBooks").then(exist => {
        if (!exist) {
            knex.schema.createTable("eventsBooks", table => {
                table.integer('eventID');
                table.string('isbn');
                table.primary(['eventID', 'isbn']);

            }).then(() => {
                return Promise.all(
                    _.map(eventsBooksList, e => {
                        return (knex("eventsBooks").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("eventsAuthors").then(exist => {
        if (!exist) {
            knex.schema.createTable("eventsAuthors", table => {
                table.integer('eventID');
                table.integer('authorID');
                table.primary(['eventID', 'authorID']);

            }).then(() => {
                return Promise.all(
                    _.map(eventsAuthorList, e => {
                        return (knex("eventsAuthors").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("users").then(exist => {
        if (!exist) {
            knex.schema.createTable("users", table => {
                table.uuid('id').primary();
                table.string('username').notNullable().unique();
                table.string('password').notNullable();
                table.string('name');
                table.string('surname');
                table.string('email');
            }).then(() => {
                return Promise.all(
                    _.map(usersList, e => {
                        return (knex("users").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("similarBooks").then(exist => {
        if (!exist) {
            knex.schema.createTable("similarBooks", table => {
                table.string('isbn');
                table.string('similarISBN');
                table.primary(['isbn', 'similarISBN'])

            }).then(() => {
                return Promise.all(
                    _.map(similarBooksList, e => {
                        return (knex("similarBooks").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("themes").then(exist => {
        if (!exist) {
            knex.schema.createTable("themes", table => {
                table.integer('data');
                table.string('value');
                table.primary(['data', 'value']);


            }).then(() => {
                return Promise.all(
                    _.map(themesList, e => {
                        return (knex("themes").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("bookThemes").then(exist => {
        if (!exist) {
            knex.schema.createTable("bookThemes", table => {
                table.string('isbn');
                table.integer('IDTheme');
                table.primary(['isbn','IDTheme']);


            }).then(() => {
                return Promise.all(
                    _.map(bookThemesList, e => {
                        return (knex("bookThemes").insert(e));
                    })
                )
            });
        }
    });


    knex.schema.hasTable("similarAuthors").then(exist => {
        if (!exist) {
            knex.schema.createTable("similarAuthors", table => {
                table.integer('id');
                table.integer('similarID');
                table.primary(['id', 'similarID']);

            }).then(() => {
                return Promise.all(
                    _.map(similarAuthorsList, e => {
                        return (knex("similarAuthors").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("reviews").then(exist => {
        if (!exist) {
            knex.schema.createTable("reviews", table => {
                table.increments('id').primary();
                table.string('isbn');
                table.string('username');
                table.integer('stars');
                table.string('value');
                table.text('comment');

            }).then(() => {
                return Promise.all(
                    _.map(reviewsList, e => {
                        return (knex("reviews").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("genres").then(exist => {
        if (!exist) {
            knex.schema.createTable("genres", table => {
                table.integer('data');
                table.string('value');
                table.primary(['data', 'value']);

            }).then(() => {
                return Promise.all(
                    _.map(genresList, e => {
                        return (knex("genres").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("bookGenres").then(exist => {
        if (!exist) {
            knex.schema.createTable("bookGenres", table => {
                table.string('isbn');
                table.integer('genreID');
                table.primary(['isbn', 'genreID']);

            }).then(() => {
                return Promise.all(
                    _.map(bookGenresList, e => {
                        return (knex("bookGenres").insert(e));
                    })
                )
            });
        }
    });

    knex.schema.hasTable("cart").then(exist => {
        if (!exist) {
            knex.schema.createTable("cart", table => {
                table.string('isbn');
                table.uuid('userID');
                table.primary(['isbn', 'userID']);

            }).then(() => {});
        }
    });


}


createDB();




module.exports = app;