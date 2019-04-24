var express = require('express');
var fs = require("fs");
var router = express.Router();
var apikey = 'ByGdy25LMh';
var Saved = require('../models/saved');


router.get('/search', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('search');
})

router.get('/mysaved', function(request, response) {
    var arr = Saved.getSave();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('mysaved', {data:arr});
})

router.post("/jobs", function(req,res){
  request("apiinthesky.herokuapp.com/jobsearch?apikey="+apikey+"&agency="+req.query.agency+"&title="+req.query.title+"&category="+req.query.category+"&service="+req.query.service+"&location="+req.query.location, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        Saved.savedInfo(data,"benefits", function(response)){
          res.render('mysaved.ejs', {data: response})
        };
      }
      else{
        res.redirect('/search');
      }

    });//look for the movie
})

router.post("/benefits", function(request,response){
  request("APIintheSky.herokuapp.com/benefitsearch?apikey="+apikey+"&name="+req.query.name+"&type="+req.query.type+"&pop="+req.query.pop+"&contact="+req.query.contact+"&desc="+req.query.desc, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        Saved.savedInfo(data,"benefits", function(response)){
          res.render('mysaved.ejs', {data: response})
        };
      }
      else{
        res.redirect('/search');
      }

    });//look for the movie
})

router.delete('/jobs/:id', function (req, res) {
  Jobs.deleteUser(req.params.id, function(){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('mysaved');
  });
})

router.delete('/jobs/:id', function (req, res) {
  Jobs.deleteUser(req.params.id, function(){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('mysaved');
  });
})
