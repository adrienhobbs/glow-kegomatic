var convert = require('./conversions.js');
var updateKeg = require('./keg-data.js');

updateKeg.addNew();

var i = 0;
setInterval(function() {
  i++;
  console.log(i);
  if(i > 40) {
    updateKeg.addNew();
  }
  updateKeg.pourAPint();
  setTimeout(updateKeg.resetActivePour, 1000);
}, 4000);
