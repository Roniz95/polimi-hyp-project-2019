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









//DB
function initSqlDB() {
    /* Locally we should launch the app with TEST=true to use SQLlite:

         > TEST=true node ./index.js

      */


    if (process.env.TEST) {
        sqlDb = sqlDbFactory({
            client: "sqlite3",
            debug: true,
            connection: {
                filename: "./debug.sqlite"
            },
            useNullAsDefault: true
        });
    } else {
        sqlDb = sqlDbFactory({
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
}


module.exports = app;