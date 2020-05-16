import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { LineRepository } from '../../repositories/line.repository';
import CmpLayout from '../../components/layout.cmp';
import Link from 'next/link';
import CmpBreadcrumb from '../../components/breadcrumb.cmp';
import { LineEntiry } from '../../entities/line.entity';

export const getStaticPaths: GetStaticPaths = async () => {
  const lines = await LineRepository.getAll();

  const paths = lines.map((line) => {
    return { params: { lineCode: line.lineCode } };
  });

  return { paths: paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ line: LineEntiry }> = async ({
  params,
}) => {
  const line = await LineRepository.findByLineCode(params?.lineCode as string);

  return { props: { line: line } };
};

type Props = (ReturnType<typeof getStaticProps> extends Promise<infer T>
  ? T
  : never)['props'];

const Component: React.FC<Props> = ({ line }) => {
  const lineSections = line.lineSections;

  return (
    <CmpLayout title={line.lineNameAlias}>
      <CmpBreadcrumb
        items={[
          { name: 'TOP', path: '/' },
          { name: '事業者一覧', path: '/company' },
          {
            name: line.company.companyNameAlias,
            path: `/company/${line.company.companyCode}`,
          },
          { name: line.lineNameAlias, path: null },
        ]}
      />
      <h1>{line.lineNameAlias}</h1>
      {lineSections.map((lineSection, i) => (
        <div className="table-responsive" key={i}>
          <table
            className="table table-sm table-bordered"
            style={{ fontSize: '0.9em' }}
          >
            <thead className="alert-dark text-center">
              <tr>
                <th className="text-nowrap">駅名</th>
                <th className="text-nowrap d-md-table-cell d-none">駅名かな</th>
                <th className="text-nowrap">接続路線</th>
                <th className="text-nowrap">接続駅</th>
              </tr>
            </thead>
            {lineSection.lineSectionLineStations.map(
              (lineSectionLineStation, i) => {
                const station = lineSectionLineStation.station;
                const groupStations =
                  station.stationGroupStation === null
                    ? []
                    : station.stationGroupStation.stationGroup.stationGroupStations
                      .map((v) => v.station)
                      .filter((v) => v.stationId !== station.stationId);
                const connectLines = station.lineStations
                  .map((v) => v.line)
                  .filter((v) => v.lineId !== line.lineId);

                return (
                  <tr key={i}>
                    <td>{station.stationName}</td>
                    <td className="d-md-table-cell d-none">
                      {station.stationNameKana}
                    </td>
                    <td>
                      {connectLines.map((line, i) => (
                        <div className="text-nowrap" key={i}>
                          <Link href={`/line/${line.lineCode}`}>
                            <a>{line.lineNameAlias}</a>
                          </Link>
                        </div>
                      ))}
                    </td>
                    <td>
                      {groupStations.map((station) => (
                        <>
                          <div>
                            <span className="mr-2">{station.stationName}</span>
                            <span className="badge badge-secondary">
                              {station.company.companyNameAlias}
                            </span>
                          </div>
                          <div>
                            <span className="mr-2">
                              {station.lineStations.map((line, i) => (
                                <Link
                                  href={`/line/${line.line.lineCode}`}
                                  key={i}
                                >
                                  <a className="d-inline-block mr-1">
                                    {line.line.lineName}
                                  </a>
                                </Link>
                              ))}
                            </span>
                          </div>
                        </>
                      ))}
                    </td>
                  </tr>
                );
              }
            )}
          </table>
        </div>
      ))}
    </CmpLayout>
  );
};

export default Component;
