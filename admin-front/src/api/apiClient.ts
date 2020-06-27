import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { config } from 'config';
import {
  ApiResponseLines,
  ApiResponseCompanies,
  ApiResponseLine,
  ApiResponseStations,
  ApiResponseCompany,
} from './apiResponse';

export class ApiClient {
  private baseUrl = config.apiUrl;

  private axiosInstance: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
      },
    });
  }

  public async login(
    mail: string,
    password: string
  ): Promise<{ token: string }> {
    const res = await this.axiosInstance.post<{ token: string }>('login', {
      mail: mail,
      password: password,
    });

    return res.data;
  }

  public async isLogin(): Promise<AxiosResponse<{ status: boolean }>> {
    return await this.axiosInstance.get('/auth-check');
  }

  public async getCompanies(): Promise<ApiResponseCompanies> {
    return (await this.axiosInstance.get(this.baseUrl + '/company')).data;
  }

  public async updateCompany(
    companyId: number,
    data: {
      companyCode: string;
      companyName: string;
      companyNameAlias: string;
      companyNameKana: string;
      length: number;
      lineNum: number;
      stationNum: number;
    }
  ): Promise<void> {
    await this.axiosInstance.post(`/company/${companyId}`, data);
  }

  public async getCompany(companyId: number): Promise<ApiResponseCompany> {
    return (
      await this.axiosInstance.get(`${this.baseUrl}/company/${companyId}`)
    ).data;
  }

  public async getLines(): Promise<ApiResponseLines> {
    return (await this.axiosInstance.get(this.baseUrl + '/line')).data;
  }

  public async getLine(lineId: number): Promise<ApiResponseLine> {
    return (await this.axiosInstance.get(`${this.baseUrl}/line/${lineId}`))
      .data;
  }

  public async getStationsByStationName(
    stationName: string
  ): Promise<ApiResponseStations> {
    return (
      await this.axiosInstance.get(
        `${this.baseUrl}/station?stationName=${stationName}`
      )
    ).data;
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
