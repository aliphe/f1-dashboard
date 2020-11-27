export function isOlderThan(date: Date, days: number): boolean {
  return new Date().setDate(new Date().getDate() - days) > date.getTime();
}

type WithUpdatedAt = { updatedAt: Date };
export function isLastUpdateOlder(
  objs: WithUpdatedAt[],
  days: number
): boolean {
  return objs.some((o) => isOlderThan(o.updatedAt, days));
}
