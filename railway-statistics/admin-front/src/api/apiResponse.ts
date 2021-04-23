import {
  CompanyEntity,
  LineEntity,
  LineSectionEntity,
  StationEntity,
  RailwayType,
  RailwayRailtrackTypes,
} from 'entity';

export type ApiResponseCompanies = (CompanyEntity & {
  railwayTypes: RailwayType[];
  railwayRailtracTypes: RailwayRailtrackTypes[];
})[];

export type ApiResponseCompany = CompanyEntity & {
  railwayTypes: RailwayType[];
  railwayRailtracTypes: RailwayRailtrackTypes[];
  lines: LineEntity[];
};

export type ApiResponseLines = (LineEntity & { company: CompanyEntity })[];

export type ApiResponseLine = LineEntity & {
  company: CompanyEntity;
  lineSections: (LineSectionEntity & {
    stations: (StationEntity & {
      lines: LineEntity[];
      groupStations: (StationEntity & {
        company: CompanyEntity;
        lines: LineEntity[];
      })[];
    })[];
  })[];
};

export type ApiResponseStations = (StationEntity & {
  company: CompanyEntity;
  lines: LineEntity[];
})[];
