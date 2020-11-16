import { Driver } from '@f1-dashboard/api-interfaces';
import axios from 'axios';
import { RequestResponse } from '.';
import { environment } from '../../../environments/environment';

export type DriversRequestResponse = {
  DriverTable: {
    Drivers: Driver[];
  };
};

export default class DriversWrapper {
  static fetchDrivers(year?: number) {
    return axios.get<RequestResponse<DriversRequestResponse>>(
      `${environment.apis.ergast.url}/f1${year ? '/' + year : ''}/drivers.json`
    );
  }
}
