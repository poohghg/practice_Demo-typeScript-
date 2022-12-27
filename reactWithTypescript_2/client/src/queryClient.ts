import { RootState } from "./redux/index";
import { useSelector } from "react-redux";
import { RequestDocument, request } from "graphql-request";
import { QueryClient } from "react-query";
import Ax from "./modules/axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

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

export const graphqlFetcher = (query: RequestDocument, variables = {}) => {
  let token;
  const root = JSON.parse(localStorage.getItem("persist:root") || "{}");
  if (Object.keys(root).length) {
    const userReducer = JSON.parse(root.userReducer);
    token = userReducer?.token;
  }
  return request(`${BASE_URL}/graphql`, query, variables, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
    authorization: token,
  });
};

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
  USER: "USER",
};
