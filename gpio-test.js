var Gpio = require('onoff').Gpio;
var scale = new Gpio(27, 'in', 'both');

scale.watch(function() {
  console.log('something happened');
});
