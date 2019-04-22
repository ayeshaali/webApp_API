var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');

//gets a user
exports.getUser = function(user_id, callback) {
  var user = createBlankUser();
  var all_users = dataJS.loadGoogle(3, function(all_users) {
    for(var i=0; i<all_users.length; i++){
      if(all_users[i].name==user_id.trim()){
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
    if (name==null||name==""||pswd==null||pswd==""){
        result= false;
        feedbackN = 42;
    }
    
    var user_key = makeid(10);
    dataJS.getAllKeys(function(keys){
      while (keys.includes(user_key)){
        user_key = makeid(10);
      }

      exports.getUser(user_id, function(user){
        if (user.name != "notarealuser") {
          result = false;
          feedbackN = 10;
        }

        if (result) {
          date=returnDate();
          var new_obj = {
            "name": name,
            "pswd": pswd,
            "key": user_key
          }
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

