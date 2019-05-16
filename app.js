const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require("knex");
const process = require("process");
const path = require('path');
const _ = require("lodash");
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/public/pages'));
let views = path.join(__dirname, '/public/pages');
module.exports = app;


//ROUTES

//Documentations routes
app.get('/backend/:docpage', function (req, res){
    res.sendFile(views + '/' + req.params.docpage)
});


