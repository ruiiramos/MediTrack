import { gql } from 'graphql-tag';

const medicationTypeDefs = gql`
  type Medication {
    id: ID!
    name: String!
    dosage: String!
    type: String!
    frequency: Int
    start_time: String
    start_date: String
    end_date: String!
    user_id: ID!
  }

  input MedicationInput {
    name: String!
    dosage: String!
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
    getMedications(userId: ID!): [Medication]
    getMedication(id: ID!): Medication
    getMedicationLogs(medicationId: ID!): MedicationLogs
    getCurrentMedications(userId: ID!): [Medication]  # Nova query para medicamentos atuais
    getHistoricalMedications(userId: ID!): [Medication]  # Nova query para histÃ³rico de medicamentos
  }

  type Mutation {
    addMedication(input: MedicationInput!): Medication
    updateMedication(id: ID!, input: MedicationInput!): Medication
    deleteMedication(id: ID!): Boolean
  }
`;

export default medicationTypeDefs;