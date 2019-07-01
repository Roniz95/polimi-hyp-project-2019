const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
const router = require('./routes.js');
const _ = require("lodash");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

//swagger 2.0 setup
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'hypermedia project',
            version: '1.0.0',
        },
        basePath: '/api',
    },
    apis: ['./public/pages/apidoc.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/backend/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



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



function initSqlDBVar()  {
    app.sqlDB = sqlDbFactory({
        debug: false,
        client: "pg",
        connection: {
            user: "postgres",
            password: "pgadmin95",
            host: "localhost",
            port: 5432,
            database: "postgres",
            ssl: false
        },
    })
}


function createDB() {
    app.sqlDB.schema.hasTable("books").then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable("books", table => {
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
                            return app.sqlDB("books").insert(b);
                        })
                    );
                });

        }
    });

    app.sqlDB.schema.hasTable('authors').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable("authors", table => {
                table.increments('id').primary();
                table.string('name');
                table.string('image');
                table.string('link');
                table.text('bio');
            })
                .then(() => {
                    return Promise.all(
                        _.map(authorsList, a => {
                            return app.sqlDB('authors').insert(a);
                        })
                    );
                });
        }
    });

    app.sqlDB.schema.hasTable('authorsOf').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('authorsOf', table => {
                table.string('isbn');
                table.integer('authorID');
                table.primary(['isbn', 'authorID'])

            })
                .then(() => {
                    return Promise.all(
                        _.map(authorsOfList, a => {
                            return app.sqlDB('authorsOf').insert(a)
                        })
                    )
            })
        }
    });

    app.sqlDB.schema.hasTable('events').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('events', table => {
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
                        return (app.sqlDB('events').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('eventsBooks').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('eventsBooks', table => {
                table.integer('eventID');
                table.string('isbn');
                table.primary(['eventID', 'isbn']);

            }).then(() => {
                return Promise.all(
                    _.map(eventsBooksList, e => {
                        return (app.sqlDB('eventsBooks').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('eventsAuthors').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('eventsAuthors', table => {
                table.integer('eventID');
                table.integer('authorID');
                table.primary(['eventID', 'authorID']);

            }).then(() => {
                return Promise.all(
                    _.map(eventsAuthorList, e => {
                        return (app.sqlDB('eventsAuthors').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('users').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('users', table => {
                table.increments('id').primary();
                table.string('username').notNullable();
                table.string('password').notNullable();
                table.string('name');
                table.string('surname');
                table.string('email');
            }).then(() => {
                return Promise.all(
                    _.map(usersList, e => {
                        return (app.sqlDB('users').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('similarBooks').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('similarBooks', table => {
                table.string('isbn');
                table.string('similarISBN');
                table.primary(['isbn', 'similarISBN'])

            }).then(() => {
                return Promise.all(
                    _.map(similarBooksList, e => {
                        return (app.sqlDB('similarBooks').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('themes').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('themes', table => {
                table.integer('data');
                table.string('value');
                table.primary(['data', 'value']);


            }).then(() => {
                return Promise.all(
                    _.map(themesList, e => {
                        return (app.sqlDB('themes').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('bookThemes').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('bookThemes', table => {
                table.string('isbn')
                table.integer('IDTheme');
                table.primary(['isbn','IDTheme']);


            }).then(() => {
                return Promise.all(
                    _.map(bookThemesList, e => {
                        return (app.sqlDB('bookThemes').insert(e));
                    })
                )
            });
        }
    });


    app.sqlDB.schema.hasTable('similarAuthors').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('similarAuthors', table => {
                table.integer('id');
                table.integer('similarID');
                table.primary(['id', 'similarID']);

            }).then(() => {
                return Promise.all(
                    _.map(similarAuthorsList, e => {
                        return (app.sqlDB('similarAuthors').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('reviews').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('reviews', table => {
                table.increments('id').primary();
                table.string('isbn');
                table.string('username');
                table.integer('stars');
                table.string('value');
                table.text('comment');

            }).then(() => {
                return Promise.all(
                    _.map(reviewsList, e => {
                        return (app.sqlDB('reviews').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('genres').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('genres', table => {
                table.integer('data');
                table.string('value');
                table.primary(['data', 'value']);

            }).then(() => {
                return Promise.all(
                    _.map(genresList, e => {
                        return (app.sqlDB('genres').insert(e));
                    })
                )
            });
        }
    });

    app.sqlDB.schema.hasTable('bookGenres').then(exist => {
        if (!exist) {
            app.sqlDB.schema.createTable('bookGenres', table => {
                table.string('isbn');
                table.string('genreID');
                table.primary(['isbn', 'genreID']);

            }).then(() => {
                return Promise.all(
                    _.map(bookGenresList, e => {
                        return (app.sqlDB('bookGenres').insert(e));
                    })
                )
            });
        }
    });
}



initSqlDBVar();
createDB();




module.exports = app;