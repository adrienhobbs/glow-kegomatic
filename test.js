var convert = require('./conversions.js');
var updateKeg = require('./keg-data.js');
// var sensor = require('ds18x20');


updateKeg.addNew();

var i = 40;
setInterval(function() {
// sensor.getAll(function (err, tempObj) {
// 	for(prop in tempObj) {

// console.log(tempObj[prop]);

// 	}
//     console.log(tempObj);
// });
  i++;
  console.log(i);
  updateKeg.pourAPint();

  if(i > 40) {
    updateKeg.addNew();
    i = 0;
  }
  setTimeout(updateKeg.resetActivePour, 2000);
}, 8000);


