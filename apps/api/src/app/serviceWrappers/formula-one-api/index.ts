export { default as driversServiceWrapper } from './drivers';

export type RequestResponse<T> = {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
  } & T;
};
