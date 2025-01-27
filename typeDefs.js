import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    medications: [Medication]
  }

  type Medication {
    id: ID!
    name: String!
    dosage: String!
    frequency: String!
    startDate: String!
    endDate: String
    user: User!
  }

  type Query {
    getUser(id: ID!): User
    getMedications(userId: ID!): [Medication]
  }

  type Mutation {
    registerUser(name: String!, email: String!, password: String!): User
    addMedication(userId: ID!, name: String!, dosage: String!, frequency: String!, startDate: String!, endDate: String): Medication
  }
`;

module.exports = typeDefs;
