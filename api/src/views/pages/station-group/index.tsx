import React from 'react';
import MainLayout from '../../layouts/main.layout';
import { StationGroupController } from '../../../controllers/page/station-group.controller';
import { StationGroup } from '../../../database/entities/stationGroupOrmEntity';

const CmpSearch: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body">
        <form method="GET" action="/page/station-group">
          <div className="form-row">
            <div className="col-md-4">
              <label>駅名</label>
              <input
                type="text"
                name="stationName"
                className="form-control form-control-sm"
                defaultValue=""
              />
            </div>
          </div>
          <div className="form-row justify-content-center mt-3">
            <div className="col-md-4">
              <button className="btn btn-sm btn-block btn-info">検索</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const CmpCreate: React.FC = () => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h6 className="mb-3">新規グループ作成</h6>
        <form method="POST" action="/page/station-group/create">
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
  );
};

const CmpEdit: React.FC<{ stationGroup: StationGroup }> = ({
  stationGroup,
}) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        {stationGroup.stationGroupStations.map((sgs) => (
          <div className="mb-1">
            <button
              type="button"
              className="btn btn-sm btn-danger py-0"
              data-toggle="modal"
              data-target={`#stationDeleteModal${sgs.station.stationId}`}
            >
              削除
            </button>
            <span className="ml-1">{sgs.station.stationName}</span>
            <span className="ml-1 text-secondary">
              （{sgs.station.company.companyNameAlias}）
            </span>
            <div
              className="modal fade"
              id={`stationDeleteModal${sgs.station.stationId}`}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <form method="POST" action="/page/station-group/delete">
                      <input
                        type="hidden"
                        name="stationId"
                        defaultValue={sgs.stationId}
                      />
                      <input
                        type="hidden"
                        name="stationGroupId"
                        defaultValue={sgs.stationGroupId}
                      />
                      <p>削除確認 {sgs.station.stationName}</p>
                      <div className="form-row">
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-sm btn-block btn-outline-secondary"
                            data-dismiss="modal"
                          >
                            キャンセル
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="submit"
                            className="btn btn-sm btn-block btn-danger"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3">
          <form method="POST" action="/page/station-group/add">
            <div className="input-group">
              <input
                type="hidden"
                name="stationGroupId"
                value={stationGroup.stationGroupId}
              />
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
  );
};

type Props = ReturnType<StationGroupController['index']> extends Promise<
  infer T
>
  ? T
  : never;

const Component: React.FC<Props> = ({ stationGroups }) => {
  return (
    <MainLayout>
      <h1 className="h3 mb-3">駅グループ 編集</h1>
      <section className="mb-3">
        <CmpSearch />
      </section>
      <section className="mb-3">
        <div className="form-row">
          <div className="col-md-4 mb-2">
            <CmpCreate />
          </div>
          {stationGroups.map((stationGroup) => (
            <div className="col-md-4 mb-2">
              <CmpEdit stationGroup={stationGroup} />
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Component;
