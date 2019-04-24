//API in the Sky
//Authors: Ayesha Ali, Thomas Brecher, Mit Ramesh

//required packages
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var app = express();
var Users = require(__dirname +'/models/User');
var Routes = require(__dirname +'/controllers/user');
var Saved = require(__dirname + '/models/saved.js');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

//set up server
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded());

var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

app.use(require('./controllers/user'));
app.use(require('./controllers/data'));

//first request, renders index
app.get('/', function(request, response){
  response.render('index', {page:request.url, title:"Index"});
});
