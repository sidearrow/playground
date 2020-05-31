import axios, { AxiosInstance } from 'axios';
import {
  CompanyEntity,
  CompanyStatisticsEntity,
  LineEntity,
  LineSectionEntity,
  StationEntity,
} from './entities';

abstract class AbstractApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:5000/api',
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

  public async getCompanyStatistics(companyId: number) {
    return await this.get<CompanyStatisticsEntity[]>(
      `/company/${companyId}/statistics`
    );
  }

  public async getLines(companyId?: number) {
    return await this.get<(LineEntity & { company: CompanyEntity })[]>(
      `/line/${companyId ?? ''}`
    );
  }

  public async getLineDetail(lineId: number) {
    return await this.get<
      LineEntity & {
        company: CompanyEntity;
        lineSections: (LineSectionEntity & {
          stations: StationEntity & { groupStations: StationEntity[] };
        })[];
      }
    >(`/line/${lineId}`);
  }
}
