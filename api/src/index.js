const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const { connectDb } = require('./helpers/db');
const { host, port, db, authApiUrl, mailUrl } = require('./configuration');

const app = express();

const postSchema = new mongoose.Schema({
  name: String,
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Database ${db}`);

    // Post.find((err, posts) => {
    //   if (err) return console.error(err);
    //   console.log('posts', posts);
    // });

    const silence = new Post({ name: 'Silence' });
    silence.save((err, savedSilence) => {
      if (err) return console.log(err);
      console.log('savedSilence', savedSilence);
    });

    console.log(silence.name);
  });
};

app.get('/test', (req, res) => {
  res.send('Our api server is working correctly');
});

app.get('/api/testwithapi', (req, res) => {
  res.json({
    testwithapi: true,
  });
});

app.get('/testwithcurrentuser', (req, res) => {
  axios.get(authApiUrl + '/currentUser').then((response) => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    });
  });
});

app.get('/testmailconfirmation', (req, res) => {
  axios.get(mailUrl + '/sendmail').then((response) => {
    res.json({
      registration: response.data,
    });
  });
});

connectDb().on('error', console.log).on('disconnected', connectDb).once('open', startServer);
