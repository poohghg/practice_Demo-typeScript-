import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    token: String!
    email: String!
    nickName: String!
  }
  extend type Query {
    login(email: String!, passWord: String!): User!
    checkEmail(email: String!): Boolean!
  }
  extend type Mutation {
    addUser(email: String!, passWord: String!, nickName: String!): User!
  }
`;

export default userSchema;
