import React, { createContext, useState } from 'react';
import { LinearProgress } from '@material-ui/core';

export const LoadingContext = createContext<{
  isNowLoading: boolean;
  setIsNowLoading: (value: boolean) => void;
}>({
  isNowLoading: false,
  setIsNowLoading: () => { },
});

export const LoadingProvider: React.FC = ({ children }) => {
  const [isNowLoading, setIsNowLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isNowLoading: isNowLoading,
        setIsNowLoading: (value) => {
          setIsNowLoading(value);
        },
      }}
    >
      {isNowLoading && (
        <>
          <LinearProgress />
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              opacity: 0.5,
              zIndex: 100,
            }}
          ></div>
        </>
      )}
      {children}
    </LoadingContext.Provider>
  );
};
