var sensor = require('ds18x20');

sensor.isDriverLoaded(function (err, isLoaded) {
    console.log(isLoaded);
});

sensor.list(function (err, listOfDeviceIds) {
  console.log(err);
    console.log(listOfDeviceIds);
});

sensor.getAll(function (err, tempObj) {
  console.log(err);
    console.log(tempObj);
});
