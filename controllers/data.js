var express = require('express');
var fs = require("fs");
var router = express.Router();
var request = require('request');
var apikey = 'ByGdy25LMh';
var Saved = require('../models/saved');

//*****LOGGED IN*******
//go to search page
router.get('/searchPrograms/:user_id', function(request, response) {
    var obj = {
      username: request.params.user_id
    }
    response.status(200);
    var data;
    response.setHeader('Content-Type', 'text/html')
    response.render('searchPrograms', {user:obj, data:data});
})
//go to search page
router.get('/searchJobs/:user_id', function(request, response) {
    var obj = {
      username: request.params.user_id
    }
      var data;
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchJobs', {user:obj,data:data});
})
//search based on params (job)
router.get('/jobsearch/:user_id', function(req, res) {
  request("http://localhost:3000/jobsearch?apikey="+apikey+"&agency="+req.query.agency+"&title="+req.query.title+"&category="+req.query.category+"&service="+req.query.service+"&location="+req.query.location, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        console.log(data);
        var u = {
          username: req.params.user_id
        };
        res.render('searchJobs', {user:u, data:data})
      }
      else{
        console.error('error:'+err);
        res.redirect('/searchJobs');
      }
    });
})
//search based on params (benefit)
router.get('/benefitsearch/:user_id', function(req, res) {
  request("http://localhost:3000/benefitsearch?apikey="+apikey+"&name="+req.query.name+"&type="+req.query.type+"&pop="+req.query.pop+"&contact="+req.query.contact+"&desc="+req.query.desc, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        res.render('searchPrograms', {user:req.params.user_id, data: data})
      }
      else{
        res.redirect('/searchPrograms/'+req.params.user_id);
      }
    });
})
//save one job
router.get("/jobs/:user_id/:id", function(req,res){
  request("http://localhost:3000/onejob?apikey="+apikey+"&id="+req.params.id, function(err, response, body) {
      if(!err){
        var data= JSON.parse(body)
        Saved.saveInfo(req.params.user_id,data,"job", function(result){
          res.render('mysaved', {data: result})
        });
      }
      else{
        res.redirect('/searchJobs/'+req.params.user_id);
      }
    });
})
//save one benefit
router.get("/benefits/:user_id/:id", function(req,res){
  request("http://localhost:3000/onebenefit?apikey="+apikey+"&id="+req.params.id, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        Saved.saveInfo(req.params.user_id,data,"benefit", function(result){
          res.render('mysaved', {data: result})
        });
      }
      else{
        res.redirect('/searchPrograms/'+req.params.user_id);
      }

    });
})
//delete one job
router.delete('/jobs/:id', function (req, res) {
  saved.deleteJob(req.params.id, function(){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('mysaved');
  });
})
//delete one benefit
router.delete('/programs/:id', function (req, res) {
  saved.deleteProgram(req.params.id, function(){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('mysaved');
  });
})
//get all the saved stuff for the user
router.get('/mysaved/:user_id', function(req, res) {
    Saved.getSave(req.params.user_id, function(jobData, programData){
      res.status(200);
      res.setHeader('Content-Type', 'text/html')
      res.render('mysaved', {jobs:jobData, programs: programData, user:req.params.user_id});
    });  
})

//*****WITHOUT LOGGING IN*******
//go to page
router.get('/searchPrograms', function(request, response) {
  var data;
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchPrograms', {user:{}, data:data});
})
//go to page
router.get('/searchJobs', function(request, response) {
  var data;
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchJobs', {user:{}, data:data});
})
//search based on params (job)
router.get('/jobsearch', function(req, res) {
  request("http://localhost:3000/jobsearch?apikey="+apikey+"&agency="+req.query.agency+"&title="+req.query.title+"&category="+req.query.category+"&service="+req.query.service+"&location="+req.query.location, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        console.log(data);
        var u = {
          username: null
        };
        res.render('searchJobs', {user:u, data:data})
      }
      else{
        console.error('error:'+err);
        res.redirect('/searchJobs');
      }
    });
})
//search based on params (benefit)
router.get('/benefitsearch', function(req, res) {
  request("http://localhost:3000/benefitsearch?apikey="+apikey+"&name="+req.query.name+"&type="+req.query.type+"&pop="+req.query.pop+"&contact="+req.query.contact+"&desc="+req.query.desc, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        var u = {
          username: null
        };
        res.render('searchPrograms', {user:u, data: data})
      }
      else{
        res.redirect('/searchPrograms');
      }
    });
})

module.exports = router;
