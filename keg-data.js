var firebase = require('firebase');
var convert = require('./conversions');

var updateKeg = (function() {

  var totalPour = 0;
  var app = firebase.initializeApp({ 
    apiKey: "AIzaSyC2HXKQIiXyGEmjfFcmdgIA01C5m4aF6PE",
    authDomain: "glowkeg.firebaseapp.com",
    databaseURL: "https://glowkeg.firebaseio.com",
    storageBucket: "glowkeg.appspot.com"
  });

  var keg = app.database().ref('/keg');

  keg.once('value').then(function(snapshot) {
    totalPour = snapshot.val().total_pour;
  });


  var updateActivePour = function (val) {
    console.log(totalPour);
    keg.update({
      active_pour: val
    });
  };

  var updateTotalPour = function (val) {
    keg.ref('/keg').update({
      active_pour: val
    });
  };

  return {
    activePour: updateActivePour
  };

}());

module.exports = updateKeg;
