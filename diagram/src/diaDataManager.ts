import { DiaCore, Station, StationTime, Time, Train } from "./models";

export type DiaData = {
  stations: {
    stationName: string;
    stationTimeDisplayPattern: [[boolean, boolean], [boolean, boolean]];
  }[];
  dias: {
    diaName: string;
    diaData: {
      trainNumber: string;
      trainName: string;
      trainType: number | null;
      trainStationTime: ([number, string | null, string | null] | null)[];
    }[];
  }[];
};

export class DiaDataManager {
  private static DEFAULT_STANDARD_TIME = 60;
  private diaData: DiaData;
  private standardTime: { up: number; down: number }[];

  constructor(diaData: DiaData) {
    this.diaData = diaData;
    this.standardTime = DiaDataManager.calcStandardTime(this.diaData);
  }

  setDiaData(diaData: DiaData): void {
    this.diaData = diaData;
    this.standardTime = DiaDataManager.calcStandardTime(this.diaData);
  }

  getDiaData(): DiaData {
    return this.diaData;
  }

  getDiaDataRaw(): string {
    return JSON.stringify(this.diaData, undefined, 2);
  }

  getStations(): Station[] {
    return this.diaData.stations.map(
      (station, i) =>
        new Station(
          station.stationName,
          {
            up: {
              arr: station.stationTimeDisplayPattern[0][0],
              dep: station.stationTimeDisplayPattern[0][1],
            },
            down: {
              arr: station.stationTimeDisplayPattern[1][0],
              dep: station.stationTimeDisplayPattern[1][1],
            },
          },
          this.standardTime[i]
        )
    );
  }

  getDias(): DiaCore[] {
    const dias = this.diaData.dias.map((dia) => {
      const trains: Train[] = dia.diaData.map((train, i) => {
        const trainStationTime = train.trainStationTime.map(
          (stationTime, j) => {
            if (stationTime === null) {
              return new StationTime(0);
            }
            const arrTime =
              stationTime[1] === null ? null : Time.initByStr(stationTime[1]);
            const depTime =
              stationTime[2] === null ? null : Time.initByStr(stationTime[2]);
            return new StationTime(stationTime[0], arrTime, depTime);
          }
        );
        return new Train(train.trainNumber, train.trainName, trainStationTime);
      });
      return new DiaCore(dia.diaName, trains);
    });
    return dias;
  }

  static calcStandardTime(diaData: DiaData): { up: number; down: number }[] {
    const tmp: (number | null)[] = [...Array(diaData.stations.length)].map(
      (v) => null
    );
    const getStandardTime = (
      st: DiaData["dias"][number]["diaData"][number]["trainStationTime"][number]
    ): string | null => {
      if (st === null) {
        return null;
      }
      return st[1] || st[2];
    };
    for (const t of diaData.dias[0].diaData) {
      t.trainStationTime.forEach((tst, i) => {
        if (i === 0) {
          tmp[i] = 0;
          return;
        }
        const prev = getStandardTime(t.trainStationTime[i - 1]);
        const now = getStandardTime(tst);
        if (prev === null || now === null) {
          return;
        }
        if (tmp[i] === null) {
          tmp[i] = Time.initByStr(now).convS() - Time.initByStr(prev).convS();
        }
      });
      if (tmp.includes(null)) {
        break;
      }
    }
    const tmp2 = tmp.map((v) => v || this.DEFAULT_STANDARD_TIME);
    const res: { up: number; down: number }[] = [];
    const sum = tmp2.reduce((prev, cur) => prev + cur);
    tmp2.forEach((v, i) => {
      const up = i === 0 ? 0 : res[i - 1].up + v;
      const down = sum - up;
      res.push({ up: up, down: down });
    });
    return res;
  }

  static parseJson(json: string): DiaData {
    // TODO: validation process
    return JSON.parse(json);
  }
}
