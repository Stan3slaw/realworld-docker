const express = require('express');
const axios = require('axios');

const { port, host, db, apiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Database ${db}`);
  });
};

app.get('/test', (req, res) => {
  res.send('Out auth server is working correctly');
});

app.get('/api/currentUser', (req, res) => {
  res.json({
    id: '1234',
    email: 'foo@gmail.com',
  });
});

app.get('/testwithapidata', (req, res) => {
  axios.get(apiUrl + '/testwithapi').then((response) => {
    res.json({
      api: response.data,
    });
  });
});

connectDb().on('error', console.log).on('disconnected', connectDb).once('open', startServer);
