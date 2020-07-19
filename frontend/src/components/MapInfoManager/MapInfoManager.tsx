import React, { createContext, useContext } from 'react';

type MapInfoManagerState = { [key: string]: boolean };

const MapInfoManagerContext = createContext<MapInfoManagerState>({});

export const MapInfoManagerItem: React.FC<{ itemKey: string }> = ({
  itemKey,
  children,
}) => {
  const state = useContext(MapInfoManagerContext);
  if (state[itemKey]) {
    return <>{children}</>;
  }
  return <></>;
};

export const MapInfoManager: React.FC<{
  state: MapInfoManagerState;
}> = ({ state, children }) => {
  return (
    <MapInfoManagerContext.Provider value={state}>
      {children}
    </MapInfoManagerContext.Provider>
  );
};
