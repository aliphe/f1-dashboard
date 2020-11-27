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
  season: Season;
}

export interface RaceResult {
  points: number;
  position: number;
  grid: number;
  laps: number;
  time?: string; // H:MM:SS.mmm
  status: string;
  team: Team;
  driver: Driver;
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

export interface Season {
  year: number;
}
