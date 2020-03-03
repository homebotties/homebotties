const express = require('express')
const path = require('path');
import { apiServer } from './api';

const app = express()
const port = process.env.PORT || 3000

apiServer.applyMiddleware({ app, path: '/api' });

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/app.html'));
});

app.listen(port, () => console.log(`Bot app running on port ${port}`))

