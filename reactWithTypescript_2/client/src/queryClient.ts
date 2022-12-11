import { RequestDocument, request } from "graphql-request";
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
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

// const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log("BASE_URL", BASE_URL);
const BASE_URL = "http://localhost:8000";
export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(`${BASE_URL}/graphql`, query, variables, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  });

export const restFetcher = async (config: FetcherConfig) => {
  try {
    if (config.data) config.data = JSON.stringify(config.data);
    const res = await Ax.getClient.request(config);
    return res.data;
  } catch (error) {}
};

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
