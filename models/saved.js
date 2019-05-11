var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname+'/client_secret.json');
var doc = new GoogleSpreadsheet('1VhmFEUdPN_pYj15K92yZbFGG-pZgVL7xrGrN2zB_R2o');
var a = [];
var Users = require(__dirname +'/User');
var dataJS = require(__dirname +'/googlesheets');
//need to add a saved google sheet

exports.saveInfo = function(user_id, jsonObj, type, callback) {
  var information;
  var string;
  Users.getUser(user_id, function(k){
      var array;
      if(type == 1){
        console.log(k.savedjob)
        var jobJson = k.savedjob
        if (k.savedjob == null || k.savedjob == "null") {
          jobJson = []
          
        } else {
          jobJson = JSON.parse(k.savedjob);
        }
        jobJson.push(jsonObj[0]);
        var final = JSON.stringify(jobJson);
        var array = [user_id, k.password, final, "null"];
        console.log(array);
      }
      else{
        var jobJson = k.savedbenefit
        if (k.savedbenefit == "null") {
          jobJson = []
        } else {
          jobJson = JSON.parse(k.savedbenefit);
        }
        jobJson.push(jsonObj[0]);
        var final = JSON.stringify(jobJson);
        var array = [user_id, k.password, k.savedjob, final];
      }
    
      dataJS.updateRow(2, user_id, array, function(){
        console.log("This has been updated");
        getSave(user_id, callback);
      });
  });
}

exports.getSave = function(user_id, callback){
  Users.getUser(user_id, function(k){
    var jobs;
    var benefits;
    
    if (k.savedjob == null || k.savedjob == "null") {
      jobs = []
    } else {
      jobs= JSON.parse(k.savedjob)
    }
    
    if (k.savedbenefit == null || k.savedbenefit == "null") {
      benefits = []
    } else {
      benefits= JSON.parse(k.savedbenefit)
    } 
    callback(jobs, benefits);
  });
}

var getSave = function(user_id, callback){
  Users.getUser(user_id, function(k){
    var jobs;
    var benefits;
    
    if (k.savedjob == null || k.savedjob == "null") {
      jobs = []
    } else {
      jobs= JSON.parse(k.savedjob)
    }
    
    if (k.savedbenefit == null || k.savedbenefit == "null") {
      benefits = []
    } else {
      benefits= JSON.parse(k.savedbenefit)
    } 
    callback(jobs, benefits);
  });
}
