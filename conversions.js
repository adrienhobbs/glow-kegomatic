const conversions = (function() {

  var litersInAGallon = 3.78541;

  var gallonsToLiters = function (gallons) {
   return (gallons * litersInAGallon); 
  };

  return {
    gallonsToLiters: gallonsToLiters
  }

}());

module.exports = conversions;
