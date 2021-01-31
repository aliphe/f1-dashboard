import Axios, { AxiosRequestConfig } from 'axios';

export default function createAxios(config?: AxiosRequestConfig) {
  const axios = Axios.create(config);

  axios.interceptors.response.use((res) => {
    if (res.status >= 400) {
      throw new Error(
        `Request failed with status ${res.status} : ${JSON.stringify(res.data)}`
      );
    }
    return res;
  });
  return axios;
}
