import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    email: String!
    nickName: String!
  }
  extend type Query {
    login(email: String!, passWord: String!): Boolean!
  }
  extend type Mutation {
    addUser(email: String!, passWord: String!, nickName: String!): Boolean!
  }
`;

export default userSchema;
