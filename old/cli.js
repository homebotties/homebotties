var arg = require('arg');
var {
  refresh,
  alert,
  set,
  lightIds,
  on,
  off,
  state,
  status,
  tripod,
} = require('./lights');

async function cli(rawArgs) {
  const args = arg({}, {permissive: false, argv: rawArgs.slice(2)});
  let options = {
    skip: args['--skip'] || false,
  };

  switch (args._[0]) {
    case 'refresh':
      refresh();
      break;

    case 'ls':
      console.table(lightIds);
      break;

    case 'alert':
      console.log(await alert(args._[1]));
      break;

    case 'on':
      on(args._[1]);
      break;

    case 'off':
      off(args._[1]);
      break;

    case 'status':
      console.log(await status(args._[1]));
      break;

    case 'freak':
      alert(tripod);
      set('Stove', {"on": false});
      set('Tripod', state().on().bri(250).xy(1, 1));
      set('Hers', state().longAlert());
      set('Stove', state().on().white(500, 100));
      break;

    default:
      console.log("ls, alert <name>");
      break;
  }
}

module.exports = cli;