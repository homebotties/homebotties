const express = require('express');
const path = require('path');
const { apiServer } = require('./api');


function sendFile(filename) {
  return (req, res) => res.sendFile(path.join(__dirname + `/${filename}`));
}

const server = express();

apiServer.applyMiddleware({ app: server, path: '/api' }); // TODO: how to express this as not middleware?
server.get('/', sendFile('examples/car/app.html')); // TODO: get app module from API?
server.get('/README', sendFile('README.md')); // TODO md render in app shell?

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Bot app running on port ${port}`))

