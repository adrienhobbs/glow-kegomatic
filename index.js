var Gpio = require('onoff').Gpio;
var flowIn = new Gpio(23, 'in', 'both');
var round = require('./utility.js').round;
var Keg = require('./keg-data.js');

var FlowMeter = (function() {

  Keg.addNew();

  var pintsInALiter    = 2.11338,
      litersInAPint    = 0.473176,
      pints            = 0,
      secondsInAMinute = 60,
      msInASecond      = 1000,
      lastClick        = 0,
      clickDelta       = 0,
      hertz            = 0,
      flow             = 0,
      thisPour         = 0,
      totalPour        = 0,
      enabled          = true,
      clicks           = 0,
      instPour,
      resetId;

  var getCurrentPour = function() {
    return round(thisPour/pintsInALiter, -3);
  };

  var resetPour = function() {
    return setTimeout(function() {
      thisPour = 0;
      Keg.resetActivePour();
    }, 4000);
  }

  var update = function () {
    clicks++;

    if (resetId) {
      clearTimeout(resetId);
    }

    var currentTime = new Date().getTime();
    clickDelta = currentTime - lastClick;
    if (enabled && clickDelta < 1000) {
      hertz    = msInASecond / clickDelta;
      flow     = hertz / (secondsInAMinute * 237.5);  // In Liters per second
      instPour = flow * (clickDelta / msInASecond);
      thisPour += instPour;
      totalPour += instPour;
      console.log("total pints: ", getCurrentPour());
      Keg.update(getCurrentPour());
    }
    // we start a timer to reset the pour every click, which is cancelled at the beginning
    // of each click. Last click won't cancel it, and pour will be reset.

    resetId = resetPour();
    lastClick = currentTime;
  }

  return {
    update: update 
  }

}());

flowIn.watch(FlowMeter.update);


