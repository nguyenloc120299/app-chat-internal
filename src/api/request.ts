import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

const baseURL = process.env.REACT_APP_BASE_URL + "api";

const createInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  return instance;
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
