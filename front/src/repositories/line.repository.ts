import { AbstractRepository } from "./abstract.repository";
import { LineEntiry } from "../entities/line.entity";

export class LineRepository extends AbstractRepository {
  public static async getAll(): Promise<LineEntiry[]> {
    return (await LineRepository.axiosInstance.get('/line')).data;
  };
}
