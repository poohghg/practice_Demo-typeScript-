import { verifyAccessToken } from "./jwt";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";

(async () => {
  const port = 8000;
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: ({ req, res }) => {
      const token = req.headers.authorization;
      console.log("authorization", token);
      if (!token) return { req, res };
      const user = verifyAccessToken(token);
      return { req, res, user };
    },
  });
  const app = express();
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });
  await app.listen({ port });
  console.log(`server listening on ${port}...`);
})();
