/*
	Script that downloads/uploads Google Analytics Custom Dimensions
	By Julien Coquet - 
    https://juliencoquet.com/en/
    https://mightyhive.com
    
	Pre-requisites:
		Google Analytics property 
		Google Sheet with access granted to Google Analytics API
*/

function onOpen() {
  // Init script and create menus
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    {name: "Download Custom Dimensions", functionName: "getCustomDims"},
    {name: "Upload Custom Dimensions", functionName: "setCustomDims"},
    
  ];
  ss.addMenu("→Custom Dimension Management", menuEntries);
};
    
    
function getCustomDims(){
  // Google Analytics account information - taken from the Settings tab
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Settings");
  var dsheet = ss.getSheetByName("Data");
  // Retrieve your GA account ID and property ID from where you get your tracking code from.
  var accountId = sheet.getRange("B1").getValue(); // e.g. 123456
  var webPropertyId = sheet.getRange("B2").getValue(); // e.g. UA-123456-1
    
  // Connect to Google Analytics Management API and return custom dimensions for the property defined in the Settings tab
  var cdimList = Analytics.Management.CustomDimensions.list(accountId, webPropertyId);
  
  var dataAll = JSON.parse(cdimList); 
  var data = dataAll.items;
  var j=0; // starting row for output
  
  // Walk through the data and output to cells in the "data" tab
  for (i in data){
    outputToCells(dsheet,j,data[i]);
    j++;
  }
}


function setCustomDims(){
  
  // Google Analytics account information - taken from the Settings tab
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Settings");
  var dsheet = ss.getSheetByName("Data");
  
  // Retrieve your GA account ID and property ID from where you get your tracking code from.
  var accountId = sheet.getRange("B1").getValue(); // e.g. 123456
  var webPropertyId = sheet.getRange("B2").getValue(); // e.g. UA-123456-1
  
  // For good measure, get user confirmation
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert("You are about to insert Custom Dimensions into property "+webPropertyId+".\nAre you sure?", ui.ButtonSet.YES_NO);
  if (response == ui.Button.NO) {
    return;
  }
  
  // Walk through each line in the sheet
  for (var i=1; i<21; i++){ // Increase from 21 to 201 in case of a GA360 property
    j = 1;
    var cdID = dsheet.getRange(i,j++).getValue(); 
    var cdIndex = dsheet.getRange(i,j++).getValue(); 
    var cdName = dsheet.getRange(i,j++).getValue(); 
    var cdScope = dsheet.getRange(i,j++).getValue(); 
    var cdActive = dsheet.getRange(i,j++).getValue();
    
    Analytics.Management.CustomDimensions.insert(
      {'name': cdName, 'scope': cdScope,'active': cdActive},
      accountId, 
      webPropertyId
    );
  }
}

function outputToCells(dsheet, row,data){

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  //var sheet = ss.getSheetByName(dsheet);
  var sheet = dsheet;
  var rng = sheet.getRange(row+1,1,1,1); rng.setValue(data.id);
  var rng = sheet.getRange(row+1,2,1,1); rng.setValue(data.index);
  var rng = sheet.getRange(row+1,3,1,1); rng.setValue(data.name);  
  var rng = sheet.getRange(row+1,4,1,1); rng.setValue(data.scope);
  var rng = sheet.getRange(row+1,5,1,1); rng.setValue(data.active);   
  
}
