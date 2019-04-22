var express = require('express');
var fs = require("fs");
var router = express.Router();
var Users = require('../models/User');

//create account button-- renders user_details
router.get('/user/new', function(req, res){
  console.log("GET REQUEST /users/new at"+ new Date());
  var u;
  var feedback = {
    failure:0
  }
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  res.render('user_details', {user:u, feedback:feedback, title:"create"});
});

//request for when user creates an account
router.post('/users',function(req,res){
  console.log('POST Request- /Users'+" at "+ new Date());
  var u = {
    name: req.body.user_name,
    pswd: req.body.pswd
  }
  
  var feedback = {
    failure: 0
  }
  console.log(feedback);
  Users.createUser(u.name, u.pswd, function(result, feedbackN){
    console.log(result);
    if (result) {
      res.redirect('/');
    } else {
      var u;
      feedback["failure"] = feedbackN;
      res.status(200);
      res.setHeader('Content-Type', 'text/html')
      res.render('user_details', {user:u, feedback:feedback, title:"create"});
    }
  });
});

//request for when user chooses to edit account after logging in
router.get('/user/:id/edit', function(req, res){
  console.log("GET REQUEST /users/"+req.params.id+"/edit"+" at "+ new Date());
  var feedback = {
    failure:0
  }
  var u = Users.getUser(req.params.id, function(u){
    console.log(u)
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.render('user_details', {user:u, feedback:feedback, title:"update"});
  });
});

//request for when user chooses to delete account
router.delete('/user/:id', function (req, res) {
  console.log("DELETE REQUEST /users/"+req.params.id+" at "+ new Date());
  Users.deleteUser(req.params.id, function(){
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    res.redirect('/');
  });
})

//request for when user updates account
router.put('/user/:id', function (req, res) {
  console.log("PUT REQUEST /users/"+req.params.id+" at "+ new Date());
  var u = {
    original_name: req.params.id,
    name: req.body.player_name,
    pswd: req.body.pswd
  }
  
  var feedback = {
    failure:0
  }
  
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  
  if (u.name==null||u.name==""||u.pswd==null||u.pswd==""){
      console.log("inv");
      result= false;
      feedback["failure"]= 42;
      Users.getUser(u.original_name, function(user) {
        res.render('user_details', {user:user, feedback:feedback, title:"update"});
      })
  }

  if (u.original_name != u.name) {
    Users.getUser(u.name, function(user) {
      if (user.name == "notarealuser") {
        Users.getUser(u.original_name, function(original_user) {
          var user_array = [u.name, u.pswd, original_user.api_key]
          Users.updateUser(u.original_name, user_array, function(){
            res.render('user_details', {user:u, feedback:feedback, title:"update"});
          });
        });
      } else {
            u.name=u.original_name;
            res.render('user_details', {user:u, feedback:feedback, title:"update"});
        }
      })
  } else {
      Users.getUser(u.original_name, function(original_user) {
        var user_array = [u.original_name, u.pswd, original_user.api_key]
        Users.updateUser(u.original_name, user_array, function(){
          res.render('user_details', {user:u, feedback:feedback, title:"update"});
        });
      });
    }
});

module.exports = router;
