var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname+'/client_secret.json');
var doc =  new GoogleSpreadsheet('1VhmFEUdPN_pYj15K92yZbFGG-pZgVL7xrGrN2zB_R2o');

exports.loadGoogle = function(filename, callback) {
  var user_data = [];
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(filename, function (err, rows) {
      callback(rows);
    });
  });
}

//Updates a row
exports.updateRow=function(filename, userName, newStuff, callback){
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[filename];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
          for(var i=0; i<cells.length;i++){
            if(cells[i].value==userName){
              sheet.getCells({'min-row': i+1,'max-row': i+1},
              function(err, cells) {
                for(var i=0; i<cells.length;i++){
                  cells[i].setValue(newStuff[i]);
                }
              });
              break;
            }
          }
          console.log("doing callback");
          callback();
      });
    });
  });
}

  // creates a new row (when making a new user)
exports.createRow = function(obj, filenumber, callback) {
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.addRow(filenumber, obj, function(){
      console.log("after writing"+obj)
      callback();
    });
  });
}

  // deletes a row (when deleting a user)
exports.deleteRow = function(user_id, file, callback) {
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[file];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
          for(var i=0; i<cells.length;i++){
            if(cells[i].value==user_id){
              var index = i;
              sheet.getRows(function (err, rows) {
                rows[i-1].del(function(err){
                  callback();
                });
              });
              break;
            }
          }
        });
      });
    });
}

exports.getAllKeys = function(callback) {
  var sheet;
  var keys = [];
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[2];
      sheet.getCells({
        'min-col': 3,
        'max-col': 3,
        'return-empty': true}, function(err, cells) {
          for(var i=0; i<cells.length;i++){
            keys.push(cells[i].value)
          }
          callback(keys);
      });
    });
  });
}

exports.clearSheet = function(file, callback){
  var sheet;
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getInfo(function(err,info){
      sheet=info.worksheets[file];
      sheet.getCells({
        'min-col': 1,
        'max-col': 1,
        'return-empty': true}, function(err, cells) {
         for(var i=0; i<cells.length;i++){
           var index = i;
           sheet.getRows(function (err, rows) {
             rows[i-1].del(function(err){
               callback();
             });
           });
          }
        })
      })
  });
}
