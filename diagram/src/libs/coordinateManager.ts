import { Time } from "../models";

export class CoordinateManager {
  baseX: number;
  baseY: number;
  marginTop: number;
  minHour: number;
  maxHour: number;
  width: number;
  height: number;

  constructor(
    marginTop: number,
    minHour: number,
    maxHour: number,
    maxStandardTime: number
  ) {
    this.baseX = 1 / 8;
    this.baseY = 1;
    this.marginTop = marginTop;
    this.minHour = minHour;
    this.maxHour = maxHour;
    this.width = (maxHour - minHour) * 3600 * this.baseX;
    this.height = maxStandardTime * this.baseY;
  }

  getX(time: Time): number {
    return (time.convS() - this.minHour * 3600) * this.baseX;
  }

  getY(s: number): number {
    return s * this.baseY;
  }
}
