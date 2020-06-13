import React, { useState } from 'react';
import {
  StationSearchSelector,
  StationSearchSelectorResponse,
} from 'components/StationSearchSelector';

export const IndexPage: React.FC = () => {
  const [station, setStation] = useState<StationSearchSelectorResponse>(null);

  return (
    <div>
      <StationSearchSelector setStation={setStation} />
      <div>{station?.stationName}</div>
    </div>
  );
};
