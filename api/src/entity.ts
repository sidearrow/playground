import { Entity, Column, OneToMany, PrimaryColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn({ name: 'company_id' })
  companyId: number;

  @Column({ name: 'company_code' })
  companyCode: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'company_name_alias' })
  companyNameAlias: string;

  @OneToMany(type => Line, line => line.company)
  @JoinColumn({ name: 'company_id' })
  lines: Line[];
}

@Entity()
export class Line {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @Column({ name: 'line_code' })
  lineCode: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'line_name' })
  lineName: string;

  @Column({ name: 'line_name_alias' })
  lineNameAlias: string;

  @Column({ name: 'line_name_kana' })
  lineNameKana: string;

  @OneToMany(type => LineSection, lineSection => lineSection.lineId)
  lineSections: LineSection[];

  @ManyToOne(type => Company, company => company.lines)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}

@Entity()
export class LineSection {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @Column({ name: 'line_section_name' })
  lineSectionName: string;

  @OneToMany(() => LineSectionStation, lineSectionStation => lineSectionStation.lineId)
  @JoinColumn([
    { name: 'line_id', referencedColumnName: 'lineId' },
    { name: 'section_id', referencedColumnName: 'sectionId' },
  ])
  lineSectionStations: LineSectionStation[];
}

@Entity()
export class LineSectionStation {
  @PrimaryColumn({ name: 'line_id' })
  lineId: number;

  @PrimaryColumn({ name: 'section_id' })
  sectionId: number;

  @PrimaryColumn({ name: 'sort_no' })
  sortNo: number;

  @Column({ name: 'station_id' })
  stationId: number;

  @OneToOne(() => Station, station => station.stationId)
  @JoinColumn({ name: 'station_id' })
  station: Station;
}

@Entity()
export class Station {
  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @Column({ name: 'station_name' })
  stationName: string;

  @OneToOne(() => StationGroupStation, stationGroupStation => stationGroupStation.stationId)
  @JoinColumn({ name: 'station_id' })
  stationGroup: StationGroupStation;
}

@Entity()
export class StationGroupStation {
  @PrimaryColumn({ name: 'station_group_id' })
  stationGroupId: number;

  @PrimaryColumn({ name: 'station_id' })
  stationId: number;

  @OneToOne(() => Station, station => station.stationId)
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @OneToMany(() => StationGroupStation, stationGroupStation => stationGroupStation.stationGroupId)
  @JoinColumn({ name: 'station_group_id', referencedColumnName: 'station_group_id' })
  groupStations: StationGroupStation[];
}
