import axios from 'axios';

export abstract class AbstractRepository {
  protected static axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
  });
}
