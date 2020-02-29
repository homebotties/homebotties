const { Bus } = require("async-i2c-bus");
const { PCA9685 } = require("pca9685-promise");

const bus = Bus({});
const device = new PCA9685(bus, {address: 0x60});

const motors = [
  [8, 10, 9],
  [13, 12, 11],
  [2, 4, 3],
  [7, 5, 6]
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

function all(value=0.5) {
  [0,1,2,3].forEach(idx => throttle(idx, value));
}

function left(value=1.0) {
  [0,2].forEach(motor => throttle(motor, -value));
  [1,3].forEach(motor => throttle(motor, value));
}

function right(value=1.0) {
  [0,2].forEach(motor => throttle(motor, value));
  [1,3].forEach(motor => throttle(motor, -value));
}

export function setDriveMode(driveMode) {
	switch(driveMode) {
		case 'STOP':
			all(0);
			break;
		case 'SLOW':
			all(0.5);
			break;
		case 'BACK':
			all(-0.5);
			break;
		case 'LEFT':
		        left(1.0);
			break;
		case 'RIGHT':
			right(1.0);
			break;
		default:
			break;
	}
}

(async () => {
  await init();

  switch(process.argv[2]) {
    case 'throttle':
      throttle(parseInt(process.argv[3])-1, parseFloat(process.argv[4]));
      break;
    case 'stop':
      all(0);
      break;
    case 'forward':
      all(1);
      break;
    case 'back':
      all(-0.5);
      break;
    case 'slow':
      all(0.5);
      break;
    case 'left':
      left();
      break;
    case 'turn':
      turn(parseFloat(process.argv[3]), parseFloat(process.argv[4]));
      break;
  }
})()

