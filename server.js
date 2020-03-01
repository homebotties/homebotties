const express = require('express')
const path = require('path');
import { apiServer } from './API';

const app = express()
const port = 3000

apiServer.applyMiddleware({ app, path: '/api' });

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Bot app running on port ${port}`))

