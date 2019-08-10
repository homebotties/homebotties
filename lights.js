var { HueApi, nupnpSearch, lightState }  = require("node-hue-api");

export const host = '192.168.86.58';
export const username = '2ozf10iyqnbn8eYwA0xQ980lxA0AstILn46WXdV2';
export const hue = new HueApi(host, username);

// Determine the host & username
//let bridges = await nupnpSearch()
//let host = bridges[0].ipaddress;
//let api = new HueApi(host);
//let username = await api.registerUser(host); // tap the button first

export const lights = require('./data/lights.json')

export const lightIds = lights.reduce((result, { name, id }) => {
  result[name] = id;
  return result;
}, {});

export const tripod = 'Tripod';
export const his = 'His';
export const hers = 'Hers';
export const counter = 'Counter';

export async function refresh() {
  let state = await hue.fullState();
  //console.log(JSON.stringify(state));
  let lights = await hue.lights();
  //console.log(JSON.stringify(lights['lights']));
}

export async function status(name) {
  let result = await hue.lightStatus(lightIds[name]);
  return result.state;
}

export async function set(name, state) {
  await hue.setLightState(lightIds[name], state);
}

export async function alert(name) {
  return await hue.setLightState(lightIds[name], lightState.create().shortAlert());
}

export async function on(name) {
  return await hue.setLightState(lightIds[name], lightState.create().on());
}

export async function off(name) {
  return await hue.setLightState(lightIds[name], lightState.create().off());
}

export function state() {
  return lightState.create()
}

// TODO see group methods and Group 0
// export async function setAll(state) {
//   for (let id of Object.values(lightIds)) {
//     await hue.setLightState(id, state);
//   }
// }
