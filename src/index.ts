import path from 'path';
import express from 'express';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.listen(3000);
