var Gpio = require('onoff').Gpio;
var scale = new Gpio(27, 'in', 'both');

console.log('listening on gpio: 27');

scale.watch(function() {
  console.log('something happened');
});
