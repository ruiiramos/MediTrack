import { gql } from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    token: String
  }

  type AuthPayload {
    token: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    registerUser(input: RegisterInput!): User
    loginUser(input: LoginInput!): AuthPayload
  }
`;

export default userTypeDefs;