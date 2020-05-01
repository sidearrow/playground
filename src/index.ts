import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('hellooo');
});

app.listen(3000);
