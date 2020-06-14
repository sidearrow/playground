import axios, { AxiosInstance } from 'axios';
import { config } from 'config';
import {
  ApiResponseLines,
  ApiResponseCompanies,
  ApiResponseLine,
  ApiResponseStations,
} from './apiResponse';

class ApiClient {
  private baseUrl = config.apiUrl;

  private axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

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

  public async updateGroupStations(
    stationId: number,
    groupStationIds: number[]
  ): Promise<void> {
    await this.axiosInstance.put(`/station/${stationId}/group-station`, {
      stationIds: groupStationIds,
    });
  }
}

export const apiClient = new ApiClient();
