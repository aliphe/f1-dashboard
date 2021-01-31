import { F1ApiClient } from '@f1-dashboard/api-clients';
import { environment } from '../../../environments/environment';

export const f1ApiClient = new F1ApiClient({
  apiUrl: environment.apis.f1,
});
