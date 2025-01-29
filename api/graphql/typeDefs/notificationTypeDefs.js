import { gql } from 'graphql-tag';

const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    medication_id: ID!
    alert_time: String!
    status: String!
  }

  type Mutation {
    scheduleNotifications: String
  }
`;

export default notificationTypeDefs;