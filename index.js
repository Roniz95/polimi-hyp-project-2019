const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
const router = require('./routes');
const _ = require("lodash");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);
app.use(express.static(__dirname + '/public/assets'));


let sqlDB;
let jsonPath = __dirname + "/public/assets/json-files/";

//------------variables that stores json----------
let booksList = require(jsonPath + 'books.json');
let authorsList = require(jsonPath + 'authors.json');
let authorsOfList = require(jsonPath + "authors_of.json");


function initSqlDBVar()  {
    sqlDB = sqlDbFactory({
        debug: false,
        client: "pg",
        connection: {
            user: "scbmehmypybpxj",
            password: "5b963c3288670fff71dda2af3ef05df5a76f7288c877b067ff34d7d0a7a79f16",
            host: "ec2-54-217-245-26.eu-west-1.compute.amazonaws.com",
            port: 5432,
            database: "d8anqmqba71u2v",
            ssl: true
        },
    });
}


function createDB() {
    sqlDB.schema.hasTable("books").then(exist => {
        if(!exist) {
            sqlDB.schema.createTable("books", table => {
                table.string('ISBN', 13).primary();
                table.string('book_name', 50);
                table.date('publication_year');
                table.string('description');  //maybe it's better to save the description in a file in the DB
                table.float('price',2 );
                table.string('photolink');

            })
                .then(() => {
                    return Promise.all(
                        _.map(booksList, b => {
                            return sqlDB("books").insert(b);
                        })
                    );
                });

        }
    });

    sqlDB.schema.hasTable('authors').then(exist => {
        if(!exist) {
            sqlDB.schema.createTable("authors", table => {
                table.increments('ID').primary();
                table.string('name', 50);
                table.string('surname', 50);
                table.string('description'); //maybe better to save in a file.
                table.date('birth_date');
            })
                .then(() => {
                    return Promise.all(
                        _.map(authorsList, a => {
                            return sqlDB('authors').insert(a);
                        })
                    );
                });
        }
//DB
function initSqlDB() {
    /* Locally we should launch the app with TEST=true to use SQLlite:

    });

    sqlDB.schema.hasTable('authors_of').then(exist => {
        if(!exist) {
            sqlDB.schema.createTable('authorsOf', table => {
                table.string('book_ISBN').references('ISBN')
                    .inTable('books')
                    .notNullable()
                    .onDelete('cascade')
                    .onUpdate('cascade');

                table.integer("author_ID").references('ID')
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




module.exports = app;