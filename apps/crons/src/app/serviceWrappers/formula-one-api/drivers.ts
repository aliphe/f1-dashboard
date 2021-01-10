import { Driver } from '@f1-dashboard/api-interfaces';
import axios from 'axios';
import { RequestResponse } from '.';
import { environment } from '../../../environments/environment';

export type ApiDriver = {
  driverId: string;
  permanentNumber: string;
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
    return res.data.MRData.DriverTable.Drivers.map((d) =>
      DriversServiceWrapper.formatDriver(d)
    );
  }

  static formatDriver(driver: ApiDriver): Driver {
    return {
      id: driver.driverId,
      code: driver.code,
      dateOfBirth: driver.dateOfBirth,
      familyName: driver.familyName,
      givenName: driver.givenName,
      nationality: driver.nationality,
      permanentNumber: Number(driver.permanentNumber),
      url: driver.url,
    };
  }
}
