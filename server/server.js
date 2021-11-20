const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');

const app = express();

app.use(express.static('client/dist'));
app.use(express.json());

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Client server listening on ${process.env.PORT}`);
});
