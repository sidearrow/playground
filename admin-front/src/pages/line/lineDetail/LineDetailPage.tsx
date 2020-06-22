import React, { useState, useEffect } from 'react';
import { ApiResponseLine } from 'api/apiResponse';
import { ApiClient } from 'api/apiClient';
import { useParams, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { StationSearchSelector } from 'components/StationSearchSelector';
import { StationEntityWithGroupStations } from 'entity';

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
      <h1>{line.lineNameAlias}</h1>
      <section>
        {line.lineSections.map((lineSection, i) => (
          <div key={i}>
            <div className="table-responsive">
              <table className="table table-sm table-bordered">
                <thead>
                  <tr className="alert-info">
                    <th>駅名</th>
                    <th>路線</th>
                    <th>接続駅</th>
                  </tr>
                </thead>
                <tbody>
                  {lineSection.stations.map((station, i) => (
                    <tr key={i}>
                      <td>{station.stationName}</td>
                      <td>
                        {station.lines.map((line, i) => (
                          <div key={i}>
                            <Link to={`/line/${line.lineId}`}>
                              {line.lineNameAlias}
                            </Link>
                          </div>
                        ))}
                      </td>
                      <td>
                        <div>
                          <button
                            className="btn btn-sm btn-primary py-0"
                            onClick={(): void =>
                              handleClickGroupStationAddBtn(station)
                            }
                          >
                            追加
                          </button>
                        </div>
                        <div className="mt-1">
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>
      <Modal
        show={groupStationAddModalIsShow}
        onHide={(): void => {
          setGroupStationAddModalIsShow(false);
        }}
      >
        <div className="modal-content modal-lg">
          <div className="modal-body">
            <h5>接続駅追加 - {groupStationAddModalStation?.stationName}</h5>
            <div className="my-2">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <button
                    className="btn btn-block btn-primary"
                    onClick={handleClickGroupStationBtn}
                  >
                    更新
                  </button>
                </div>
              </div>
            </div>
            <StationSearchSelector
              initialSelectStations={groupStationAddModalStation?.groupStations}
              handleSetSelectStationIds={(ids): void => {
                setSelectGroupStationIds(ids);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
