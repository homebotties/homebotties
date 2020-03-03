export const status = 'ok';

export async function logs () {
  return [{text:'test1'},{text:'test2'}];
}

export async function createLog (args) {
  return args;
}

