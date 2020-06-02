import { DB } from '../database/database';
import { Connection } from 'typeorm';

export abstract class BaseRepository {
  protected readonly connection: Connection;

  protected async getConnection() {
    return await DB.getConnection();
  }
}
