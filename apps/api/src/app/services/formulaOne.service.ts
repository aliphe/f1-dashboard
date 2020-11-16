import { Driver } from '@f1-dashboard/api-interfaces';
import DriversWrapper from '../serviceWrappers/formula-one-api/drivers';

export default class FormulaOneService {
  async fetchDrivers(year?: number): Promise<Driver[]> {
    const res = await DriversWrapper.fetchDrivers(year);
    return res.data.MRData.DriverTable.Drivers;
  }
}
