import { gql } from 'graphql-tag';

const medicationTypeDefs = gql`
  type Medication {
    id: ID!
    name: String!
    dosage: Int!
    type: String!
    frequency: Int
    start_time: String
    start_date: String
    end_date: String!
    user_id: ID!
  }

  input MedicationInput {
    name: String!
    dosage: Int!
    type: String!
    frequency: Int
    start_time: String
    start_date: String
    end_date: String!
  }

  type MedicationLog {
    id: ID!
    medication_id: ID!
    user_id: ID!
    date: String!
    status: String!
    note: String
  }

  type MedicationLogs {
    active: [MedicationLog]
    expired: [MedicationLog]
  }

  type Query {
    getCurrentMedications: [Medication]
    getHistoricalMedications: [Medication]
  }

  type Mutation {
    addMedication(input: MedicationInput!): Medication
    updateMedication(id: ID!, input: MedicationInput!): Medication
    deleteMedication(id: ID!): Boolean
  }
`;

export default medicationTypeDefs;