var convert = require('./conversions.js');
var updateKeg = require('./keg-data.js');
var sensor = require('ds18x20');

updateKeg.addNew();


var i = 0;
setInterval(function() {
sensor.getAll(function (err, tempObj) {
	for(prop in tempObj) {

console.log(tempObj[prop]);

	}
    console.log(tempObj);
});
  i++;
  console.log(i);
  if(i > 40) {
    updateKeg.addNew();
  }
  updateKeg.pourAPint();
  setTimeout(updateKeg.resetActivePour, 1000);
}, 4000);


