const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
require('./utils/passport');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    // app.use('/', require('./routes'));
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

module.exports = app;