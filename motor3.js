const { Bus } = require("async-i2c-bus");
const { PCA9685 } = require("pca9685-promise");

const bus = Bus({});
const device = new PCA9685(bus, {address: 0x60});

const motors = [
  [8, 10, 9],
  [7, 6, 5],
  [2, 4, 3],
  [13, 11, 12]
];

async function init() {
  await bus.open();
  await device.init();
  await device.set_frequency(50);
  motors.forEach((motor) => on(motor[0]));
}
  
function on(channel) {
  device.set_pwm_ms(channel, 0xffff);
}

function off(channel) {
  device.set_pwm_ms(channel, 0);
}

function throttle(motorIndex, value) {
  let duty_cycle = 0xffff * Math.abs(value);
  if (value > 0) {
    device.set_pwm_ms(motors[motorIndex][1], duty_cycle);
    device.set_pwm_ms(motors[motorIndex][2], 0);
  } else if (value < 0) {
    device.set_pwm_ms(motors[motorIndex][1], 0);
    device.set_pwm_ms(motors[motorIndex][2], duty_cycle);
  } else {
    device.set_pwm_ms(motors[motorIndex][1], 0);
    device.set_pwm_ms(motors[motorIndex][2], 0);
  }
}

function all(value) {
  [0,1,2,3].forEach(idx => throttle(idx, value));
}

function left() {
  throttle(0, -0.5);
  throttle(1, 0.5);
  throttle(2, -0.5);
  throttle(3, 0.5);
}

function right() {
  throttle(0, 0.5);
  throttle(1, -0.5);
  throttle(2, 0.5);
  throttle(3, -0.5);
}

(async () => {
  await init();

  switch(process.argv[2]) {
    case 'throttle':
      throttle(3);
      break;
    case 'stop':
      all(0);
      break;
    case 'forward':
      all(1);
      break;
    case 'back':
      all(-1);
      break;
    case 'slow':
      all(0.5);
      break;
    case 'left':
      left();
      break;
    case 'right':
      right();
      break;
  }
})()

