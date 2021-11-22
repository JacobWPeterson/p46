const express = require('express');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.static('client/dist'));
app.use(express.json());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Client server listening on ${process.env.PORT}`);
});
