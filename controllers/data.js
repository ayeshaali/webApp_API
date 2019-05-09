var express = require('express');
var fs = require("fs");
var router = express.Router();
var apikey = 'ByGdy25LMh';
var Saved = require('../models/saved');

//go to search page
router.get('/searchPrograms/:user_id', function(request, response) {
    var obj = {
      username: request.params.user_id
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchPrograms', {user:obj});
})

router.get('/searchJobs/:user_id', function(request, response) {
    var obj = {
      username: request.params.user_id
    }
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchJobs', {user:obj});
})

router.get('/searchPrograms', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchPrograms', {user:{}});
})

router.get('/searchJobs', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('searchJobs', {user:{}});
})

//search based on params (job)
router.get('/jobsearch/:user_id', function(req, res) {
  request("apiinthesky.herokuapp.com/jobsearch?apikey="+apikey+"&agency="+req.query.agency+"&title="+req.query.title+"&category="+req.query.category+"&service="+req.query.service+"&location="+req.query.location, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        res.render('searchJobs', {user:req.params.user_id,data: data})
      }
      else{
        res.redirect('/searchJobs/'+req.params.user_id);
      }
    });
})

//search based on params (benefit)
router.get('/benefitsearch/:user_id', function(req, res) {
  request("APIintheSky.herokuapp.com/benefitsearch?apikey="+apikey+"&name="+req.query.name+"&type="+req.query.type+"&pop="+req.query.pop+"&contact="+req.query.contact+"&desc="+req.query.desc, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        res.render('searchPrograms', {user:req.params.user_id, data: data})
      }
      else{
        res.redirect('/searchPrograms/'+req.params.user_id);
      }
    });
})

router.get('/jobsearch', function(req, res) {
  request("apiinthesky.herokuapp.com/jobsearch?apikey="+apikey+"&agency="+req.query.agency+"&title="+req.query.title+"&category="+req.query.category+"&service="+req.query.service+"&location="+req.query.location, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        var u;
        res.render('searchJobs', {user:u, data: data})
      }
      else{
        res.redirect('/searchJobs');
      }
    });
})

//search based on params (benefit)
router.get('/benefitsearch', function(req, res) {
  request("APIintheSky.herokuapp.com/benefitsearch?apikey="+apikey+"&name="+req.query.name+"&type="+req.query.type+"&pop="+req.query.pop+"&contact="+req.query.contact+"&desc="+req.query.desc, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        var u;
        res.render('searchPrograms', {user:u, data: data})
      }
      else{
        res.redirect('/searchPrograms');
      }
    });
})

//save one job
router.post("/jobs/:user_id/:id", function(req,res){
  request("apiinthesky.herokuapp.com/onejob?apikey="+apikey+"&id="+req.params.id, function(err, response, body) {
      if(!err){
        var data= JSON.parse(body)
        Saved.saveInfo(req.params.user_id,data,1, function(result){
          res.render('mysaved', {data: result})
        });
      }
      else{
        res.redirect('/searchJobs/'+req.params.user_id);
      }
    });
})

//save one benefit
router.post("/benefits/:user_id/:id", function(req,res){
  request("APIintheSky.herokuapp.com/onebenefit?apikey="+apikey+"&id="+req.params.id, function(err, response, body) {
      if(!err){
        var data = JSON.parse(body);
        Saved.saveInfo(req.params.user_id,data,2, function(result){
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

module.exports = router;
