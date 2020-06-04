import axios, { AxiosInstance } from 'axios';
import {
  CompanyEntity,
  CompanyStatisticsEntity,
  LineEntity,
  LineSectionEntity,
  StationEntity,
  LineResponse,
} from './entities';

abstract class AbstractApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost/api',
    });
  }

  protected async get<T>(url: string): Promise<T> {
    return (await this.axiosInstance.get(url)).data;
  }
}

export class ApiClient extends AbstractApiClient {
  public async getCompanyAll() {
    return await this.get<CompanyEntity[]>('/company');
  }

  public async getCompanyDetail(companyId: number) {
    return await this.get<CompanyEntity>(`/company/${companyId}`);
  }

  public async getCompanyDetailByCode(companyCode: string) {
    return await this.get<CompanyEntity>(`/company/code=${companyCode}`);
  }

  public async getCompanyStatistics(companyId: number) {
    return await this.get<CompanyStatisticsEntity[]>(
      `/company/${companyId}/statistics`
    );
  }

  public async getLines() {
    return await this.get<(LineEntity & { company: CompanyEntity })[]>('/line');
  }

  public async getLinesByCompanyId(companyId: number) {
    return await this.get<(LineEntity & { company: CompanyEntity })[]>(
      `/company/${companyId}/line`
    );
  }

  public async getLineByCode(lineCode: string) {
    return await this.get<LineResponse>(`/line/code=${lineCode}`);
  }
}
