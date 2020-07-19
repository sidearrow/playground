import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { MainMap } from './mainMap';
import { config } from './config';

import './style.css';
import 'ol/ol.css';

MainMap.init(config.baseMaps[2].url, config.baseMaps[2].attributes);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
