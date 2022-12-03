import { Resolver } from "./types";

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, contextValue, info) => {},
  },
  Mutation: {
    addCart: (parent, args, contextValue, info) => {},
    updateCart: (parent, args, contextValue, info) => {},
    deleteCart: (parent, args, contextValue, info) => {},
    executePay: (parent, args, contextValue, info) => {},
  },
};

export default cartResolver;
