const express = require('express');
const app = express();

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('tiles'));

app.listen(3000);
