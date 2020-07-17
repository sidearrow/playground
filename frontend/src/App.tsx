import React from 'react';
import { Map } from './components/Map';

export const App: React.FC = () => (
  <div>
    <div className="w-full md:w-1/2  bg-transparent absolute z-10 right-0">
      <div className="bg-white m-1 p-2 border border-gray-500 rounded text-sm flex"></div>
      <div className="bg-white m-1 p-2 border border-gray-500 rounded text-sm flex"></div>
    </div>
    <Map />
  </div>
);
