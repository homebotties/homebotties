var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;
 
var options = {
    i2c: i2cBus.openSync(1),
    address: 0x60,
    frequency: 1600,
    debug: false
};

pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    pwm.setPulseLength(2, 1500);
    pwm.setDutyCycle(8, 0.25);
    pwm.channelOff(8);
    pwm.channelOff(9)
    pwm.channelOff(10)
    pwm.channelOff(3);
});
pwm.setPulseLength(2, 1500);
pwm.setDutyCycle(8, 0.25);
pwm.channelOff(8);
pwm.channelOff(9)
pwm.channelOff(10)
pwm.channelOn(3);

