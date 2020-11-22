export function isOlderThan(date: Date, days: number): boolean {
  return new Date().setDate(new Date().getDate() - days) > date.getTime();
}
