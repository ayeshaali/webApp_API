var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname+'/client_secret.json');
var doc = new GoogleSpreadsheet('1VhmFEUdPN_pYj15K92yZbFGG-pZgVL7xrGrN2zB_R2o');

//gets a user
exports.getUser = function(user_id, callback) {
  var user = createBlankUser();
  var all_users = dataJS.loadGoogle(3, function(all_users) {
    console.log(all_users)
    for(var i=0; i<all_users.length; i++){
      if(all_users[i].username==user_id){
        console.log("yes")
        user = all_users[i];
        break;
      }
    }
    callback(user);
  });
  return true;
}

//creates a user
exports.createUser = function(name, pswd, callback) {
    var result = true;
    var feedbackN = 0;
    console.log(name+" "+pswd)
    if (name==null||name==""||pswd==null||pswd==""){
        result= false;
        feedbackN = 42;
    }

    var user_key = makeid(10);
    dataJS.getAllKeys(function(keys){
      while (keys.includes(user_key)){
        user_key = makeid(10);
      }

      exports.getUser(name, function(user){
        if (user.name != "notarealuser") {
          result = false;
          feedbackN = 10;
        }

        if (result) {
          var new_obj = {
            "Username": name.trim(),
            "Password": pswd.trim(),
            "SavedJob": "hello",
            "SavedBenefit":"hello"
          }
          console.log(new_obj)
          dataJS.createRow(new_obj, 3, function(){
            callback(true, feedbackN);
          })
        } else {
          callback(false, feedbackN);
        }
      })

    })

}

//deletes a user
exports.deleteUser = function(user_id, callback) {
  dataJS.deleteRow(user_id, callback)
}

//updates the date for a user
exports.updateUser = function(user_id, updates, callback) {
  dataJS.updateRow(2, user_id, updates, function(){
    console.log("doing next");
    callback();
  });
}

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var createBlankUser= function(){
  var user={
    name:"notarealuser",
    games_played:"test",
    lost:"test",
    won:"test",
    password:"test"
  };
  return user;
}
