import React, { createContext } from 'react';

const MapInfoManagerContext = createContext({});

export const MapInfoManagerItem: React.FC<{ key: string }> = ({
  key,
  children,
}) => {
  return <>{children}</>;
};

export const MapInfoManager: React.FC<{
  state: { [key: string]: boolean };
}> = ({ state }) => {
  return (
    <MapInfoManagerContext.Provider value={state}>
      <div>aaa</div>
    </MapInfoManagerContext.Provider>
  );
};
