import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_MEDICATION = gql`
  mutation AddMedication($input: MedicationInput!) {
    addMedication(input: $input) {
      id
      name
      dosage
      type
      frequency
      start_date
      end_date
      start_time
    }
  }
`;

export const GET_CURRENT_MEDICATIONS = gql`
  query GetCurrentMedications {
    getCurrentMedications {
      id
      name
      dosage
      type
      frequency
      start_date
      end_date
      start_time
    }
  }
`;