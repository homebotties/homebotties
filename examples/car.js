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

export async function init() {
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
  console.log(`car all ${value}`);
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

export function setDriveMode(driveMode, v=0.5) {
	switch(driveMode) {
		case 'STOP':
			all(0);
			break;
		case 'FORWARD':
			all(v);
			break;
		case 'BACK':
			all(-v);
			break;
		case 'LEFT':
		        left(v);
			break;
		case 'RIGHT':
			right(v);
			break;
		default:
			break;
	}
}

export function Car() {
  const handler = (driveMode) => { api(`mutation { setDriveMode(driveMode:${driveMode}, v: 0.2) }`)};
  return html`
    <div>
      <button onClick=${() => handler('FORWARD')}>Slow</button>
      <button onClick=${() => handler('STOP')}>Stop</button>
      <button onClick=${() => handler('BACK')}>Back</button>
      <button onClick=${() => handler('LEFT')}>Left</button>
      <button onClick=${() => handler('RIGHT')}>Right</button>
    </div>
  `
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
    default:
      break;
  }
})()

