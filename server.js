const express = require('express')
const path = require('path');
import { apiServer } from './api';

const app = express();
const port = process.env.PORT || 3000;

apiServer.applyMiddleware({ app, path: '/api' });

function sendFile(filename) {
  return (req, res) => res.sendFile(path.join(__dirname + `/${filename}`));
}

app.get('/', sendFile('app.html')); // TODO: get app module from API?

app.listen(port, () => console.log(`Bot app running on port ${port}`))

