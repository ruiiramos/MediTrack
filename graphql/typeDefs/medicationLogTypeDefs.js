import { gql } from 'apollo-server-express';

const medicationLogTypeDefs = gql`
  type MedicationLog {
    id: ID!
    medication_id: Int!
    user_id: Int!
    action: String!
    details: String
    timestamp: String!
  }

  extend type Query {
    getMedicationHistory(medicationId: Int!): [MedicationLog]
  }
`;

export default medicationLogTypeDefs;
