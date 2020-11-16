import { Response, Driver } from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class DriversAPI {
  static async fetchDriversByYear(year: number) {
    const res = await axios.get<Response<{ drivers: Driver[] }>>(
      `/api/drivers?year=${year}`
    );
    return res;
  }
}
