export class Time {
  readonly h: number;
  readonly m: number;
  readonly s: number;

  constructor(h: number, m = 0, s = 0) {
    this.h = h;
    this.m = m;
    this.s = s;
  }

  convS(): number {
    return this.h * 3600 + this.m * 60 + this.s;
  }

  static initByStr(str: string): Time {
    const [h, m, s] = str.split(":").map((v) => Number(v));
    return new Time(h, m, s);
  }

  static diffS(x: Time, y: Time): number {
    return x.convS() - y.convS();
  }

  toString(): string {
    return String(this.h * 100 + this.m);
  }
}

export class StationTime {
  /* 0: null 1: teisya, 2: tsuka, 3: keiyunashi */
  static STATION_TIME_TYPE = [0, 1, 2, 3];

  stationTimeType: typeof StationTime.STATION_TIME_TYPE[number];
  arrTime: Time | null;
  depTime: Time | null;

  constructor(
    stationTimeType: number,
    arrTime: Time | null = null,
    depTime: Time | null = null
  ) {
    this.stationTimeType = stationTimeType;
    this.arrTime = arrTime;
    this.depTime = depTime;
  }
}

export class TrainType {
  static DEFAULT = {
    NAME_SHORT: "",
    BORDER_STYLE: {
      STYLE: "solid",
      WIDTH: 1,
      COLOR: "#00000",
    },
  };
  public readonly borderStyle: { style: string; width: number; color: string };
  constructor(
    public readonly name: string,
    public readonly nameShort: string = TrainType.DEFAULT.NAME_SHORT,
    borderStyle: { style?: string; width?: number; color?: string } = {}
  ) {
    this.borderStyle = {
      style: borderStyle.style || TrainType.DEFAULT.BORDER_STYLE.STYLE,
      width: borderStyle.width || TrainType.DEFAULT.BORDER_STYLE.WIDTH,
      color: borderStyle.color || TrainType.DEFAULT.BORDER_STYLE.COLOR,
    };
  }
}

export class Train {
  constructor(
    public readonly trainNumber: string,
    public readonly trainName: string,
    public readonly trainStationTime: StationTime[]
  ) {}
}

export class Station {
  constructor(
    public readonly stationName: string,
    public readonly stationTimeDisplay: {
      up: { arr: boolean; dep: boolean };
      down: { arr: boolean; dep: boolean };
    },
    public readonly stationStandardTime: { up: number; down: number }
  ) {}
}

export class DiaCore {
  constructor(
    public readonly diaName: string,
    public readonly diaData: Train[]
  ) {}
}
