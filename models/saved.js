var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname+'/client_secret.json');
var doc = new GoogleSpreadsheet('1VhmFEUdPN_pYj15K92yZbFGG-pZgVL7xrGrN2zB_R2o');

//need to add a saved google sheet


exports.saveInfo = function(id, user_id, password, filename, callback){
  var information;
  var string;
  var c = [user_id, password];
  //var string = JSON.parse(json);
    dataJS.loadGoogle(filename, function(){
      doc.getRows(filename,function(err,rows){
        for(var i = 0; i<rows.length; i++){
          if(rows.id == this.id){
            c.push(rows);
            break;
          }
        }
      });

      doc.updateRow(3, user_id, c, function(){
        console.log("Updated")
      });
    });
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
