type ResolverKeys = "Query" | "Mutation";

export type Resolver = {
  [k in ResolverKeys]: {
    [key: string]: (
      parent: string,
      args: { [key: string]: any },
      contextValue: any,
      info: any,
    ) => any;
  };
};
