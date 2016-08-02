var firebase = require('firebase');
var round = require('./utility.js').round;
var convert = require('./conversions');

var updateKeg = (function() {

  var totalBeerPoured, beerRemaining;  

  var app = firebase.initializeApp({ 
    apiKey: "AIzaSyC2HXKQIiXyGEmjfFcmdgIA01C5m4aF6PE",
    authDomain: "glowkeg.firebaseapp.com",
    databaseURL: "https://glowkeg.firebaseio.com",
    storageBucket: "glowkeg.appspot.com"
  });

  var keg = app.database().ref('/keg');

  var addNew = function() {
    keg.update({
      beer_remaining: {
        pints: 40,
        liters: 18.971
      },
      active_pour: {
        pints: 0,
        liters: 0
      },
      total_beer_poured: {
        pints: 0,
        liters: 0
      }
    });
  };

   keg.once('value').then(function(snapshot) {
     totalBeerPoured = snapshot.val().total_beer_poured;
     beerRemaining = snapshot.val().beer_remaining;
   });

  var getBeerRemaining = function (beerPoured) {
    beerRemaining = {
      pints: convert.litersToPints(beerRemaining.liters - beerPoured),
      liters: beerRemaining.liters - beerPoured
    };

    return beerRemaining;
  };

  var getActivePour = function (beerPoured) {
    return {
      pints: convert.litersToPints(beerPoured),
      liters: beerPoured
    };
  };

  var getTotalBeerPoured = function (beerPoured) {
    totalBeerPoured = {
      pints: convert.litersToPints(beerPoured) + totalBeerPoured.pints,
      liters: beerPoured + totalBeerPoured.liters
    };
    return totalBeerPoured;
  };

  var update = function (val) {
    var activePour = getActivePour(val);
    var beerRemaining = getBeerRemaining(val);
    var totalBeerPoured = getTotalBeerPoured(val);
    if (activePour && beerRemaining && totalBeerPoured) {
      keg.update({
        active_pour: activePour,
        beer_remaining: beerRemaining,
        total_beer_poured: totalBeerPoured
      });
    }
  };

  var pourAPint = function () {
    updateKeg(convert.pintsToLiters(1));
  };
  var resetActivePour = function () {
      keg.update({
        active_pour: {
          pints: 0,
          liters: 0
        }
      });
  
  }

  return {
    update,
    addNew,
    pourAPint,
    resetActivePour
  };

}());

module.exports = updateKeg;
