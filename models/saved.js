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
      if(type = 1){
        var c = JSON.parse(k.SavedJob);
        c.push(jsonObj);
        var final = JSON.stringify(c);
      }
      else{
        var c = JSON.parse(k.SavedBenefit);
        c.push(jsonObj);
        var final = JSON.stringify(c);
      }
    var array = [user_id, k.password, final];
      doc.updateRow(3, user_id, array, function(){
        console.log("This has been updated");
        callback(final);
      });
  });
}




  //var string = JSON.parse(json);
  /*
    dataJS.loadGoogle(filename, function(){
      doc.getRows(filename,function(err,rows){
        for(var i = 0; i<rows.length; i++){
          if(rows.id == this.id){
            c.push(rows);
            break;
          }
        }
      });
    */



    /*
    information = {Agency: string.agency, business_title: string.business_title, job_category: string.job_category, Part_or_Full: string.part_or_full, Location: string.location};
    string = JSON.stringify(information);
    array = [user_id, password, information];

  }
  else{
    information = {Program_Name: string.program_name, benefit_type: string.benefit_type, population_served: string.population_served, Contact_Info: string.contact_info, string.summary};
    string = JSON.stringify(information);
    array = [user_id, password, information];
  }
  */
  //return information;





exports.getSave = function(user_id, callback){
  var saveArray = [];
  Users.getUser(user_id, function(k){
    saveArray[0] = JSON.parse(k.SavedJob);
    saveArray[1] = JSON.parse(k.SavedBenefit);
      callback(saveArray[0], saveArray[1]);
  });
}
