import React, { useState, useEffect } from 'react';
import { ApiResponseLine } from 'api/apiResponse';
import { apiClient } from 'api/apiClient';
import { useParams, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { GroupStationAddModal } from './components/GroupStationAddModal';
import { StationSearchSelector } from 'components/StationSearchSelector';

export const LineDetailPage: React.FC = () => {
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
  ] = useState<{ stationId: number; stationName: string } | null>(null);
  const [groupStationAddModalIsShow, setGroupStationAddModalIsShow] = useState(
    false
  );

  const [selectGroupStationIds, setSelectGroupStationIds] = useState<number[]>(
    []
  );

  const handleClickGroupStationAddBtn = (
    stationId: number,
    stationName: string
  ): void => {
    setGroupStationAddModalStation({
      stationId: stationId,
      stationName: stationName,
    });
    setGroupStationAddModalIsShow(true);
  };

  const handleClickGroupStationBtn = () => {
    console.log(selectGroupStationIds);
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
                            onClick={() =>
                              handleClickGroupStationAddBtn(
                                station.stationId,
                                station.stationName
                              )
                            }
                          >
                            追加
                          </button>
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
        onHide={() => {
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
                    追加
                  </button>
                </div>
              </div>
            </div>
            <StationSearchSelector
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
