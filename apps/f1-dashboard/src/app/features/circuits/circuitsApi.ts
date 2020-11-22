import { Response, Circuit } from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class Circuits {
  static async fetchCircuits() {
    const res = await axios.get<Response<{ circuits: Circuit[] }>>(
      `/api/circuits`
    );
    return res;
  }
}
