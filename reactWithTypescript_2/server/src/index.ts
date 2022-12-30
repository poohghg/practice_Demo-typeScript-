import cors from "cors";
import { verifyAccessToken } from "./jwt";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import cookieParser from "cookie-parser";
// import cookie from "cookie";

(async () => {
  const port = 8000;
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: async ({ req, res }) => {
      let user = {};
      // req.headers["set-cookie"] = { name :};
      // res.
      // res.cookie("test", "Dasdas", {
      //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      //   httpOnly: true,
      //   sameSite: "none",
      //   domain: "http://localhost",
      // });
      // res.setHeader("X-Set-Cookie", res.getHeader("set-cookie") ?? "");
      console.log("1", req.headers.cookie);
      console.log("2", req.cookies);
      return { req, res };
      // try {
      //   // req.header.cookieParser
      //   await console.log("req.cookies", req.headers.cookie);
      //   const token = req.headers.authorization;
      //   if (!token) return { req, res };
      //   user = verifyAccessToken(token);
      //   return { req, res, user };
      // } catch (error) {}
      // return { req, res, user };
    },
  });
  const app = express();
  const corsOptions = {
    // origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    origin: "http://localhost:3000",
    credentials: true,
  };
  // app.set("trust proxy", process.env.NODE_ENV !== "production");
  app.use(cors(corsOptions));
  app.use(cookieParser());

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: corsOptions,
  });
  await app.listen({ port });
  console.log(`server listening on ${port}...`);
})();
