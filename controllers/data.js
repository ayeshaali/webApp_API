var express = require('express');
var fs = require("fs");
var router = express.Router();

router.get('/search', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('search');
})