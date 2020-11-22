import axios from 'axios';

import { Circuit } from '@f1-dashboard/api-interfaces';
import { RequestResponse } from '.';
import { environment } from 'apps/api/src/environments/environment';

export type ApiCircuit = {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    locality: string;
    country: string;
  };
};

type CircuitsRequestResponse = RequestResponse<{
  CircuitTable: {
    Circuits: ApiCircuit[];
  };
}>;

export default class CircuitsServiceWrapper {
  static async fetchCircuits(): Promise<Circuit[]> {
    const res = await axios.get<CircuitsRequestResponse>(
      `${environment.apis.ergast.url}/f1/circuits.json?limit=100`
    );
    return res.data.MRData.CircuitTable.Circuits.map((c) =>
      CircuitsServiceWrapper.formatCircuit(c)
    );
  }

  static formatCircuit(circuit: ApiCircuit): Circuit {
    return {
      id: circuit.circuitId,
      url: circuit.url,
      name: circuit.circuitName,
      city: circuit.Location.locality,
      country: circuit.Location.country,
    };
  }
}
