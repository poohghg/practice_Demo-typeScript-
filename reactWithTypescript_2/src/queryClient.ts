import { QueryClient } from "react-query";
import Ax from "./modules/axios";

interface FetcherConfig {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: { [key: string]: any } | string;
  params?: { [key: string]: any };
}

// https://2ham-s.tistory.com/407
export const getClient = (() => {
  let client: null | QueryClient = null;
  if (!client)
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 10,
          cacheTime: 1000 * 60 * 60 * 24,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        },
      },
    });
  return client;
})();

export const fetcher = async (config: FetcherConfig) => {
  try {
    // if (config.params)
    //   config.url += "?" + new URLSearchParams(config.params).toString();
    if (config.data) config.data = JSON.stringify(config.data);
    const res = await Ax.getClient.request(config);
    return res.data;
  } catch (error) {}
};

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
};