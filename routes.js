const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const path = require('path');
const _ = require("lodash");
const process = require("process");

let pages = path.join(__dirname, '/public/pages/');

router.get('/', function(req, res, ) {
    res.sendFile(__dirname  + '/public/index.html');
});


router.get('/backend/main.html', function (req, res){
    res.sendFile(pages + 'main.html')
});

router.get('/backend/spec.yaml', function (req, res) {

});

module.exports = router;