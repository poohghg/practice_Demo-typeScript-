import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

interface FetcherConfig {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: { [key: string]: any };
  params?: { [key: string]: any };
}

export const getClient = (() => {
  let client: null | QueryClient = null;
  if (!client) return new QueryClient();
  return client;
})();

const baseUrl: string = "https://fakestoreapi.com";

// https://yamoo9.github.io/axios/guide/api.html#%EA%B5%AC%EC%84%B1-%EC%98%B5%EC%85%98
const getAxios = () => {
  const axiosConfig: AxiosRequestConfig = {
    baseURL: baseUrl,
    // withCredentials: false,
    // headers: {
    //   "Access-Control-Allow-Origins": baseUrl,
    //   "Content-Type": "application/json",
    // 'Content-Type': 'application/json',
    // },
    //
  };
  const client: AxiosInstance | null = axios.create(axiosConfig); // client: AxiosInstance
  if (client) return client;
  return axios.create(axiosConfig);
};
const ax = getAxios();

export const fetcher = async (config: FetcherConfig) => {
  // console.log(config, "config");
  try {
    const res = await ax.request(config);
    return res;
  } catch (error) {}
};
