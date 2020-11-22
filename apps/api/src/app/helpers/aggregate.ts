export function aggregateBy<T, K extends keyof T & string>(data: T[], key: K) {
  const obj: { [a: string]: T } = {};
  return data.reduce((acc, val) => {
    acc[(val[key] as unknown) as string] = val; // meh
    return acc;
  }, obj);
}
