const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
const router = require('./routes.js');
const _ = require("lodash");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');


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
    });
}


function createDB() {
    app.sqlDB.schema.hasTable("books").then(exist => {
        if(!exist) {
            app.sqlDB.schema.createTable("books", table => {
                table.string('isbn').primary();
                table.string('title');
                table.integer('publishingDate');
                table.string('publishingHouse');
                table.string('genre');
                table.string('image');
                table.text('abstract');
                table.text('authorInterview');
                table.float('price',2 );

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
}
//DB
function initSqlDB() {}
    /* Locally we should launch the app with TEST=true to use SQLlite:

    });

    sqlDB.schema.hasTable('authors_of').then(exist => {
        if(!exist) {
            sqlDB.schema.createTable('authorsOf', table => {
                table.string('isbn').references('isbn')
                    .inTable('books')
                    .notNullable()
                    .onDelete('cascade')
                    .onUpdate('cascade');

                table.integer("author_id").references('id')
                    .inTable('authors')
                    .notNullable()
                    .onDelete('cascade')
                    .onUpdate('cascade');

                table.primary('book_ISBN', 'author_ID');

            })
                .then(() => {
                    _.map(authorsOfList, a => {
                        return sqlDB('authors_of').insert(a);
                    })
                });


        }


    })
}
*/

initSqlDBVar();
createDB();



module.exports = app;