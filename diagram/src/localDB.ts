import { DiaData } from "./diaDataManager";

export class LocalDB {
  static set(diaData: DiaData): void {
    window.localStorage.setItem("diaData", JSON.stringify(diaData));
  }

  static get(): DiaData {
    return JSON.parse(LocalDB.getRaw());
  }

  static getRaw(): string {
    return window.localStorage.getItem("diaData") as string;
  }
}
