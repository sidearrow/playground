import React from 'react';
import { StationGroup } from '../../../entities/station-group.entity';
import MainLayout from '../../layouts/main.layout';

const Component: React.FC<{
  stationGroups: StationGroup[];
}> = ({ stationGroups }) => {
  return (
    <MainLayout>
      <div>
        {stationGroups.map((v, i) => (
          <div className="card" key={i}>
            <div className="card-body">
              {v.stationGroupStations.map((v, i) => (
                <div key={i}>{v.station.stationName}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Component;
