import React, { useState, useEffect } from 'react';
import { StationEntity, CompanyEntity } from 'entity';
import { apiClient } from 'api/apiClient';

export const StationSearchSelector: React.FC<{
  handleSetSelectStationIds?: (ids: number[]) => void;
}> = ({ handleSetSelectStationIds }) => {
  const [stations, setStations] = useState<
    (StationEntity & { company: CompanyEntity })[]
  >([]);
  const [selectStations, setSelectStations] = useState<
    (StationEntity & { company: CompanyEntity })[]
  >([]);

  useEffect(() => {
    if (handleSetSelectStationIds !== undefined) {
      handleSetSelectStationIds(selectStations.map((v) => v.stationId));
    }
  }, [selectStations]);

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

  const handleClickSelectBtn = (stationIndex: number): void => {
    setSelectStations([...selectStations, stations[stationIndex]]);
  };

  const handleClickDeleteSelectStationBtn = (index: number): void => {
    setSelectStations(selectStations.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="py-2">
        {selectStations.map((station, i) => (
          <span className="btn-group mr-1 mb-1" key={i}>
            <button className="btn btn-sm btn-primary">
              <span>{station.stationName}</span>
              <small className="ml-1">
                [{station.company.companyNameAlias}]
              </small>
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={(): void => {
                handleClickDeleteSelectStationBtn(i);
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
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
                handleClickSelectBtn(i);
              }}
            >
              選択
            </button>
            <span className="ml-1">
              <span>{station.stationName}</span>
              <span className="ml-1">
                <small>[{station.company.companyNameAlias}]</small>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
