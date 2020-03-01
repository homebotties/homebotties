const express = require('express')
const path = require('path');
import { apiServer } from './api';

const app = express();
const port = process.env.PORT || 3000;

apiServer.applyMiddleware({ app, path: '/api' });

function sendFile(filename) {
  return (req, res) => res.sendFile(path.join(__dirname + `/${filename}`));
}

app.get('/', sendFile('index.html'));

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Bot app running on port ${port}`))

