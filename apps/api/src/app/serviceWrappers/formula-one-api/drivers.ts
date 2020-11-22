import { Driver } from '@f1-dashboard/api-interfaces';
import axios from 'axios';
import { RequestResponse } from '.';
import { environment } from '../../../environments/environment';

type ApiDriver = {
  driverId: string;
  permanentNumber: number;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string; // ISO
  nationality: string;
};

export type DriversRequestResponse = RequestResponse<{
  DriverTable: {
    Drivers: ApiDriver[];
  };
}>;

export default class DriversServiceWrapper {
  static async fetchDrivers(year: number): Promise<Driver[]> {
    const res = await axios.get<DriversRequestResponse>(
      `${environment.apis.ergast.url}/f1${year ? '/' + year : ''}/drivers.json`
    );
    return res.data.MRData.DriverTable.Drivers.map((d) => ({
      ...d,
      id: d.driverId,
    }));
  }
}
