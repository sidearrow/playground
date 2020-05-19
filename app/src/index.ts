import path from 'path';
import express from 'express';
import expressSession from 'express-session';
import expressFlash from 'express-flash';
import router from './router';
import bodyParser from 'body-parser';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: 'XXXX', resave: true, saveUninitialized: true })
);
app.use(expressFlash());

app.use(router);

app.listen(3000);
