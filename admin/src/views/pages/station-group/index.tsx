import React from 'react';
import MainLayout from '../../layouts/main.layout';
import { StationGroupController } from '../../../controllers/page/station-group.controller';
import { StationGroup } from '../../../entities/station-group.entity';

const CmpSearch: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="form-row">
          <div className="col-md-4">
            <label>駅名</label>
            <input
              type="text"
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
      </div>
    </div>
  );
};

const CmpCreate: React.FC = () => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h6 className="mb-3">新規グループ作成</h6>
        <form method="POST" action="">
          <div className="input-group">
            <input type="text" className="form-control form-control-sm" />
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
          <div>
            <span>{sgs.station.stationName}</span>
            <span className="ml-1 text-secondary">
              （{sgs.station.company.companyNameAlias}）
            </span>
          </div>
        ))}
        <div className="mt-3">
          <form method="POST" action="">
            <div className="input-group">
              <input type="text" className="form-control form-control-sm" />
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
