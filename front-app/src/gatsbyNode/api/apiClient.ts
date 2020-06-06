import axios, { AxiosInstance } from 'axios';
import { apiResponseValidation } from './apiResponseValidation';
import schema from './schema.json';
import { CompanyEntity } from 'entities';

abstract class AbstractApiClient {
  private static axiosInstance: AxiosInstance;

  constructor() {
    if (!AbstractApiClient.axiosInstance) {
      AbstractApiClient.axiosInstance = axios.create({
        baseURL: 'http://localhost/api',
      });
    }
  }

  protected async get<T>(url: string, schema: Object): Promise<T> {
    return this.validate<T>(
      (await AbstractApiClient.axiosInstance.get(url)).data,
      schema
    );
  }

  protected validate<T>(data: T, schema: Object): T {
    const res = apiResponseValidation(data, schema);

    if (res !== undefined && res !== null) {
      console.log(res);
      throw new Error();
    }

    return data;
  }
}

export class ApiClient extends AbstractApiClient {
  public async getCompanyAll() {
    return await this.get<CompanyEntity[]>(
      '/company',
      schema.definitions.ApiResponseCompanyAll
    );
  }
}
