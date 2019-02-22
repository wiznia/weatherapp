const express = require('express');
const bodyParser = require('body-parser');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const http = require('http');
const dotenv = require('dotenv');
const app = express(); 
const server = http.createServer(app);

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const key = process.env.REACT_APP_API_KEY;
const url = `https://api.darksky.net/forecast/${key}/`;

app.get('/api/darksky', (req, res) => {
  try {
    const fullURL = `${url}${req.query.latitude},${req.query.longitude}?units=si`;

    fetch(fullURL)
      .then(response => {
        return response.json();
      })
      .then(response => {
          res.status(200).json(response);
      });
  } catch(error) {
    res.status(500).json({'message': 'Dark Sky API error', 'error' : error});
  }
});

server.listen('3001');
console.log('Server listening on port 3001');
