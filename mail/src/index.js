const express = require('express');

const { port } = require('./configuration');

const app = express();

app.get('/test', (req, res) => {
  res.send('Out mail server is working correctly');
});

app.get('/api/sendmail', (req, res) => {
  res.json({
    email: 'foo@gmail.com',
    confirmed: false,
  });
});

app.listen(port, () => {
  console.log(`Started mail service on port ${port}`);
});
