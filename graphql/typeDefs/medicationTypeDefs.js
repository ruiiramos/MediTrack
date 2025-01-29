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

  type Query {
    getMedications(userId: ID!): [Medication]
    getMedication(id: ID!): Medication
  }

  type Mutation {
    addMedication(input: MedicationInput!): Medication
    updateMedication(id: ID!, input: MedicationInput!): Medication
    deleteMedication(id: ID!): Boolean
  }
`;

export default medicationTypeDefs;