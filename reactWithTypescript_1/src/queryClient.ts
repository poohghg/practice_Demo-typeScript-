import { RequestDocument, request, GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

interface FetcherConfig {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: { [key: string]: any } | string;
  params?: { [key: string]: any };
}

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

const BASE_URL = "http://localhost:8000";
const graphQLClient = new GraphQLClient(`${BASE_URL}/graphql`);

export const graphqlFetcher = (
  query: RequestDocument,
  variables: { [key: string]: any },
) => {
  graphQLClient.setHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
    credentials: "include",
  });
  return graphQLClient.request(query, variables);
};

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
  USER: "USER",
};
