import { Driver } from '@f1-dashboard/api-interfaces';

export function driverName(driver: Driver): string {
  return `${driver.givenName} ${driver.familyName}`;
}

export function processAge(dateString: string): number {
  return new Date().getFullYear() - new Date(dateString).getFullYear();
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString();
}
