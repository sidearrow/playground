import * as express from 'express';
import config, { configInit } from './config'

configInit();

const app = express();

app.get('/', (req, res) => res.send(config));

app.listen(8080);
