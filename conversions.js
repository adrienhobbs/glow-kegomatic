var round = require('./utility.js').round;

var conversions = (function() {

  var litersPerGallon = 3.78541;
  var pintsPerLiter   = 2.11338;
  var litersPerPint   = 0.473176;

  var gallonsToLiters = function (gallons) {
    return round((gallons * litersPerGallon), -2); 
  };

  var litersToPints = function (liters) {
    return round(liters * pintsPerLiter, -2);
  };

  var pintsToLiters = function(pints) {
    return round((pints * litersPerPint), -2);
  };

  return {
    gallonsToLiters,
    litersToPints,
    pintsToLiters
  };

}());

module.exports = conversions;
