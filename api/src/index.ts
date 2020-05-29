import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { useExpressServer } from 'routing-controllers';
import bodyParser from 'body-parser';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'tsx');
app.engine('tsx', require('express-react-views').createEngine());

app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
  controllers: [path.join(__dirname, 'controllers/**/*.ts')],
});

app.listen(3000);
