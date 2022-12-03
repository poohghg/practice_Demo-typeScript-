import { gql } from "apollo-server-express";
import productSchema from "./product";
import cartSchema from "./cart";

// gql
const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, productSchema, cartSchema];
