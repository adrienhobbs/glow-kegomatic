var firebase = require('firebase');
var round = require('./utility.js').round;
var convert = require('./conversions');
var sensor = require('ds18x20');

var updateKeg = (function() {

  var totalBeerPoured = {pints: 0, liters: 0, gallons: 0}, beerRemaining = {liters: 0, pints: 0, gallons: 0};  
  var kegTemperature = 0;

  var app = firebase.initializeApp({ 
    apiKey: "AIzaSyC2HXKQIiXyGEmjfFcmdgIA01C5m4aF6PE",
    authDomain: "glowkeg.firebaseapp.com",
    databaseURL: "https://glowkeg.firebaseio.com",
    storageBucket: "glowkeg.appspot.com"
  });

  var keg = app.database().ref('/keg');

  var updateTemperature = function() {
    sensor.getAll(function(err, tempObj) {
      if(!err) {
        for (prop in tempObj) {
          kegTemperature = (tempObj[prop] - 32) * (5/9);
        }
      }
    });
  };

  var addNew = function() {
    keg.update({
      beerRemaining: {
        pints: 40,
        liters: 18.971,
        percentLeft: 100
      },
      activePour: {
        pints: 0,
        liters: 0
      }
    });
  };

  keg.once('value').then(function(snapshot) {
    totalBeerPoured = snapshot.val().totalBeerPoured;
    beerRemaining = snapshot.val().beerRemaining;
  });

  var getBeerRemaining = function (beerPoured) {
    beerRemaining = {
      pints: convert.litersToPints(beerRemaining.liters - beerPoured),
      liters: round((beerRemaining.liters - beerPoured), -4),
      gallons: convert.litersToGallons(beerRemaining.liters - beerPoured),
      percentLeft: round((100 - ((beerRemaining.liters - beerPoured)/100) * 100), -3)
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
      pints: round(convert.litersToPints(beerPoured) + totalBeerPoured.pints, -2),
      liters: round(beerPoured + totalBeerPoured.liters, -4)
    };
    return totalBeerPoured;
  };

  var update = function (val) {
    var activePour = getActivePour(val);
    var beerRemaining = getBeerRemaining(val);
    var totalBeerPoured = getTotalBeerPoured(val);
    if (activePour && beerRemaining && totalBeerPoured) {
      keg.update({
        activePour: activePour,
        beerRemaining: beerRemaining,
        totalBeerPoured: totalBeerPoured,
        temperature: kegTemperature
      });
    }
  };

  var pourAPint = function () {
    update(convert.pintsToLiters(0.3));
  };

  var resetActivePour = function () {
    keg.update({
      activePour: {
        pints: 0,
        liters: 0
      }
    });
  };
  setInterval(function() {
    updateTemperature();
  }, 2000);

  return {
    update,
    addNew,
    pourAPint,
    resetActivePour
  };

}());

module.exports = updateKeg;
