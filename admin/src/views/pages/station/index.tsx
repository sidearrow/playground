import React from 'react';
import MainLayout from '../../layouts/main.layout';
import { StationController } from '../../../controllers/page/station.controller';

type Props = ReturnType<StationController['index']> extends Promise<infer T>
  ? T
  : never;

const Component: React.FC<Props> = ({ stations, search }) => {
  return (
    <MainLayout>
      <h1 className="h1">駅一覧</h1>
      <section className="mb-4">
        <div className="card">
          <div className="card-body">
            <form method="GET" action="/page/station">
              <div className="form-row mb-3">
                <div className="col-md-4">
                  <label>駅名</label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="stationName"
                    defaultValue={search.stationName}
                  />
                </div>
              </div>
              <div className="form-row justify-content-center">
                <div className="col-md-4">
                  <button className="btn btn-sm btn-block btn-info">
                    検索
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="row">
        {stations.map((station, i) => {
          const groupStations =
            station.stationGroupStation === null
              ? []
              : station.stationGroupStation.stationGroup.stationGroupStations.map(
                (v) => v.station
              );

          const stationGroupActionUrl =
            station.stationGroupStation === null
              ? '/station-group'
              : `/station-group/${station.stationGroupStation.stationGroupId}`;

          return (
            <div className="col-md-4 mb-2" key={i}>
              <div className="card mb-2 h-100">
                <div className="card-body">
                  <div className="mb-3">
                    <span className="mr-2">{station.stationName}</span>
                    <span className="mr-2">({station.stationId})</span>
                    <span className="text-secondary">
                      ({station.company.companyName})
                    </span>
                  </div>
                  <hr />
                  <div className="mb-3">
                    {groupStations.map((station, i) => (
                      <div key={i}>
                        <span className="mr-2">{station.stationName}</span>
                        <span className="text-secondary">
                          ({station.company.companyName})
                        </span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <form method="POST" action={stationGroupActionUrl}>
                      <label>グループ駅追加</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="stationId"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-sm btn-info">追加</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </MainLayout>
  );
};

export default Component;
