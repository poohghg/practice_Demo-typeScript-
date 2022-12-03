import { Resolver } from "./types";

const productResolver: Resolver = {
  Query: {
    products: (parent, args, contextValue, info) => {},
    product: (parent, args, contextValue, info) => {},
  },
  Mutation: {},
};

export default productResolver;
