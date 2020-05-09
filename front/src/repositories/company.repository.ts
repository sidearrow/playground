import { CompanyEntity } from "../entities/company.entity";
import { AbstractRepository } from "./abstract.repository";

export class CompanyRepository extends AbstractRepository {
  public static async getAll(): Promise<CompanyEntity[]> {
    return (await CompanyRepository.axiosInstance.get('/company')).data;
  };
}
