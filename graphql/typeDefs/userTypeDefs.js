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

  type Query {
    getUsers: [User]
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default userTypeDefs;