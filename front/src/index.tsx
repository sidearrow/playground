import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { TrainMap } from './libs/trainMap';

import './styles/index.css';
import 'ol/ol.css';

new TrainMap();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
