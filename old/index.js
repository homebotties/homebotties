const { router, get, post, options } = require('microrouter');
const cors = require('micro-cors')();
const serveHandler = require('serve-handler'); // TODO remove
import { apiServer } from './API';

const apiHandler = cors(apiServer.createHandler());

// TODO: dynamically dispatch routes based on State
module.exports = cors(router(
  post('/api', apiHandler),
  get('/foo', (req, res) => { res.send('hi'); }),
  get('/', (req, res) => serveHandler(req, res, { public: '.' })),
));


