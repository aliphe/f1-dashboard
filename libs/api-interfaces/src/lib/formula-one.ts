export interface Team {
  id: string;
  url: string;
  name: string;
  nationality: string;
}

export interface Driver {
  id: string;
  permanentNumber: number;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string; // ISO
  nationality: string;
}

export interface Circuit {
  id: string;
  url: string;
  name: string;
  city: string;
  country: string;
}

export interface Race {
  round: number;
  name: string;
  circuit: Circuit;
  date: string;
  url: string;
}

export interface TeamStanding {
  position: number;
  points: number;
  wins: number;
  team: Team;
}

export interface DriverStanding {
  position: number;
  points: number;
  wins: number;
  driver: Driver;
}
