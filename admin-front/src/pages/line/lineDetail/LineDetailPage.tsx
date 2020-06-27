import React, { useState, useEffect } from 'react';
import { ApiResponseLine } from 'api/apiResponse';
import { ApiClient } from 'api/apiClient';
import { useParams, Link } from 'react-router-dom';
import { StationSearchSelector } from 'components/StationSearchSelector';
import { StationEntityWithGroupStations } from 'entity';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from '@material-ui/core';
import { CmpLink } from 'components/CmpLink';

export const LineDetailPage: React.FC = () => {
  const apiClient = new ApiClient();

  const lineId = Number(useParams<{ lineId: string }>().lineId);
  const [line, setLine] = useState<ApiResponseLine | null>(null);

  useEffect(() => {
    (async () => {
      setLine(await apiClient.getLine(lineId));
    })();
  }, [lineId]);

  const [
    groupStationAddModalStation,
    setGroupStationAddModalStation,
  ] = useState<StationEntityWithGroupStations | null>(null);
  const [groupStationAddModalIsShow, setGroupStationAddModalIsShow] = useState(
    false
  );

  const [selectGroupStationIds, setSelectGroupStationIds] = useState<number[]>(
    []
  );

  const handleClickGroupStationAddBtn = (
    station: StationEntityWithGroupStations
  ): void => {
    setGroupStationAddModalStation(station);
    setGroupStationAddModalIsShow(true);
  };

  const handleClickGroupStationBtn = (): void => {
    if (groupStationAddModalStation === null) return;
    (async (): Promise<void> => {
      await apiClient.updateGroupStations(
        groupStationAddModalStation.stationId,
        selectGroupStationIds
      );
      setLine(await apiClient.getLine(lineId));
    })();
  };

  if (line === null) {
    return <div></div>;
  }

  return (
    <>
      <Typography variant="h1">{line.lineNameAlias}</Typography>
      <section>
        {line.lineSections.map((lineSection, i) => (
          <div key={i}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>駅名</TableCell>
                    <TableCell>路線</TableCell>
                    <TableCell>接続駅</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineSection.stations.map((station, i) => (
                    <TableRow key={i}>
                      <TableCell>{station.stationName}</TableCell>
                      <TableCell>
                        {station.lines.map((line, i) => (
                          <div key={i}>
                            <CmpLink to={`/line/${line.lineId}`}>
                              {line.lineNameAlias}
                            </CmpLink>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(): void =>
                            handleClickGroupStationAddBtn(station)
                          }
                        >
                          追加
                        </Button>
                        {station.groupStations.length > 0 && (
                          <Box marginTop={2}>
                            {station.groupStations.map((station, i) => (
                              <div key={i}>
                                <span>{station.stationName}</span>
                                <span>
                                  <small>
                                    [{station.company.companyNameAlias}]
                                  </small>
                                </span>
                              </div>
                            ))}
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </section>
      <Dialog
        open={groupStationAddModalIsShow}
        onClose={(): void => {
          setGroupStationAddModalIsShow(false);
        }}
      >
        <DialogTitle>
          接続駅追加 - {groupStationAddModalStation?.stationName}
        </DialogTitle>
        <DialogContent dividers>
          <Box marginBottom={1}>
            <Grid container justify="center">
              <Grid xs={12} sm={6}>
                <Button
                  onClick={handleClickGroupStationBtn}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  更新
                </Button>
              </Grid>
            </Grid>
          </Box>
          <StationSearchSelector
            initialSelectStations={groupStationAddModalStation?.groupStations}
            handleSetSelectStationIds={(ids): void => {
              setSelectGroupStationIds(ids);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
