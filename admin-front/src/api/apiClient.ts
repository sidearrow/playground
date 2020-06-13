import {
  ApiResponseLines,
  ApiResponseCompanies,
  ApiResponseLine,
  ApiResponseStations,
} from './apiResponse';

class ApiClient {
  private baseUrl = 'http://localhost/api';

  public async getCompanies(): Promise<ApiResponseCompanies> {
    return await (await fetch(this.baseUrl + '/company')).json();
  }

  public async getLines(): Promise<ApiResponseLines> {
    return await (await fetch(this.baseUrl + '/line')).json();
  }

  public async getLine(lineId: number): Promise<ApiResponseLine> {
    return await (await fetch(`${this.baseUrl}/line/${lineId}`)).json();
  }

  public async getStationsByStationName(
    stationName: string
  ): Promise<ApiResponseStations> {
    return await (
      await fetch(`${this.baseUrl}/station?stationName=${stationName}`)
    ).json();
  }

  public async patchStationGroupStations(
    stationId: number,
    groupStationIds: number[]
  ): Promise<boolean> {
    return true;
  }
}

export const apiClient = new ApiClient();
