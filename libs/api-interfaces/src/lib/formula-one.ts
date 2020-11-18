export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
}

export interface Driver {
  driverId: string;
  permanentNumber: number;
  givenName: string;
  familyName: string;
  dateOfBirth: string; // YYYY-MM-DD
  nationality: string;
}

export interface ConstructorStanding {
  position: number;
  points: number;
  wins: number;
  Constructor: Constructor;
}

export interface DriverStanding {
  position: number;
  points: number;
  wins: number;
  Driver: Driver;
  Constructors: Constructor[];
}
