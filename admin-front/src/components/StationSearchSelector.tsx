import React, { useState } from 'react';
import { StationEntity, CompanyEntity } from 'entity';
import { apiClient } from 'api/apiClient';

// eslint-disable-next-line
export type StationSearchSelectorResponse = null | (StationEntity & { company: CompanyEntity });

export const StationSearchSelector: React.FC<{
  setStation: React.Dispatch<
    React.SetStateAction<StationSearchSelectorResponse>
  >;
}> = ({ setStation }) => {
  const [stations, setStations] = useState<
    (StationEntity & { company: CompanyEntity })[]
  >([]);

  const [searchStationName, setSearchStationName] = useState<string>('');
  const handleChangeStationNameForm = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchStationName(e.target.value);
  };

  const handleClickSearchBtn = (): void => {
    (async (): Promise<void> => {
      setStations(await apiClient.getStationsByStationName(searchStationName));
    })();
  };

  const handleClickSelectBtn = (stationId: number): void => {
    setStation(stations.find((v) => v.stationId === stationId) ?? null);
  };

  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="駅名"
          value={searchStationName}
          onChange={handleChangeStationNameForm}
          name="stationName"
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleClickSearchBtn}>
            検索
          </button>
        </div>
      </div>
      <div className="mt-2">
        {stations.map((station, i) => (
          <div key={i} className="mb-1">
            <button
              className="btn btn-sm btn-primary py-0"
              onClick={(): void => {
                handleClickSelectBtn(station.stationId);
              }}
            >
              選択
            </button>
            <span className="ml-1">{station.stationName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
