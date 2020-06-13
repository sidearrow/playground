import {
  CompanyEntity,
  LineEntity,
  LineSectionEntity,
  StationEntity,
} from 'entity';

export type ApiResponseCompanies = CompanyEntity[];

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
