import React, { useState, useEffect } from 'react';
import { StationEntity } from 'entity';
import { ApiClient } from 'api/apiClient';
import {
  Chip,
  Box,
  InputBase,
  Paper,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

export const StationSearchSelector: React.FC<{
  initialSelectStations?: StationEntity[];
  handleSetSelectStationIds?: (ids: number[]) => void;
}> = ({ initialSelectStations, handleSetSelectStationIds }) => {
  const apiClient = new ApiClient();

  const [stations, setStations] = useState<StationEntity[]>([]);
  const [selectStations, setSelectStations] = useState<StationEntity[]>(
    initialSelectStations ?? []
  );

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
    const targetStation = stations[stationIndex];
    setSelectStations([...selectStations, targetStation]);
  };

  const handleClickDeleteSelectStationBtn = (index: number): void => {
    setSelectStations(selectStations.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Box marginBottom={1}>
        {selectStations.map((station, i) => (
          <Chip
            key={i}
            label={`${station.stationName} [${station.company.companyNameAlias}]`}
            onDelete={(): void => {
              handleClickDeleteSelectStationBtn(i);
            }}
          />
        ))}
      </Box>
      <Box marginBottom={1}>
        <Paper component="form" style={{ display: 'flex' }}>
          <InputBase
            placeholder="駅名"
            name="stationName"
            value={searchStationName}
            onChange={handleChangeStationNameForm}
            style={{ flex: 1, marginLeft: '0.5rem' }}
          />
          <IconButton onClick={handleClickSearchBtn}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box>
        {stations.map((station, i) => (
          <Box marginBottom={1} key={i}>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={(): void => {
                handleClickSelectBtn(i);
              }}
            >
              選択
            </Button>
            <span>
              {station.stationName}
              <small>[{station.company.companyNameAlias}]</small>
            </span>
          </Box>
        ))}
      </Box>
    </div>
  );
};
