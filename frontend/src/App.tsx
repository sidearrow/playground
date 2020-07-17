import React from 'react';
import { Map } from './components/Map';

export const App: React.FC = () => (
  <div>
    <header>
      <nav className="py-4">
        <div className="flex px-4 justify-between">
          <a className="text-lg" href="/">
            sidearrow's GIS Sandbox
          </a>
          <button>OPEN</button>
        </div>
      </nav>
    </header>
    <main>
      <div className="w-full md:w-1/2  bg-transparent absolute z-10 right-0">
        <div className="bg-white m-1 p-2 border border-gray-500 rounded text-sm flex"></div>
        <div className="bg-white m-1 p-2 border border-gray-500 rounded text-sm flex">
          <div className="px-2">
            <span>ズームレベル</span>
            <span id="metaZoom"></span>
          </div>
          <div className="px-2">
            <span>緯度</span>
            <span id="metaCenterLatitude"></span>
          </div>
          <div className="px-2">
            <span>経度</span>
            <span id="metaCenterLongitude"></span>
          </div>
        </div>
      </div>
      <Map />
    </main>
  </div>
);
