var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname+'/client_secret.json');
var doc = new GoogleSpreadsheet('1VhmFEUdPN_pYj15K92yZbFGG-pZgVL7xrGrN2zB_R2o');

//need to add a saved google sheet


exports.saveInfo = function(json, filename, callback){
  var information;
  var string = JSON.parse(json);
  if(filename == 1){
    dataJS.createRow(this.json, 1, function(){
      callback(true,feedback);
    });
    information = [string.agency, string.business_title, string.job_category, string.part_or_full, string.location];
  }
  else{
    dataJS.createRow(this.json, 2, function(){
      callback(true,feedback);
    });
    information = [string.program_name, string.benefit_type, string.population_served, string.contact_info, string.summary];
  }
  return information;
}


exports.getSave = function(filename, callback){
  var saveArray = [];
  var allslides = dataJS.loadGoogle(this.filename, function(allslides){
    for(var i = 0; i<allslides.length;i++){
      saveArray.push(allslides);
    }
  });
  return saveArray;
}
