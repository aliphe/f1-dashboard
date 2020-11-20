export { default as driversServiceWrapper } from './drivers';
export { default as standingsServiceWrapper } from './standings';

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