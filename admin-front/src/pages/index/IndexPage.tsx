import React, { useState } from 'react';
import { StationSearchSelector } from 'components/StationSearchSelector';

export const IndexPage: React.FC = () => {
  const [stationIds, setStationIds] = useState<number[]>();

  const handleSetSelectStationIds = (ids: number[]) => {
    setStationIds(ids);
  };

  return (
    <div>
      <StationSearchSelector
        handleSetSelectStationIds={handleSetSelectStationIds}
      />
      <div>
        {stationIds?.map((v) => (
          <span>{v}</span>
        ))}
      </div>
    </div>
  );
};
