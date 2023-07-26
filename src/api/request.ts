import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const baseURL = "";

const createInstance = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

const requestService = {
  get: (
    url: string,
    optional?: { params?: any; headers?: any }
  ): Promise<AxiosResponse> => {
    const instance = createInstance();
    return instance.get(url, {
      params: optional?.params,
      headers: optional?.headers,
    });
  },

  post: (
    url: string,
    optional?: { data?: any; headers?: any }
  ): Promise<AxiosResponse> => {
    const instance = createInstance();
    return instance.post(url, optional?.data, {
      headers: optional?.headers,
    });
  },

  put: (url: string, data?: any): Promise<AxiosResponse> => {
    const instance = createInstance();
    return instance.put(url, data);
  },

  patch: (url: string, data?: any): Promise<AxiosResponse> => {
    const instance = createInstance();
    return instance.patch(url, data);
  },

  delete: (url: string): Promise<AxiosResponse> => {
    const instance = createInstance();
    return instance.delete(url);
  },
};

export default requestService;
