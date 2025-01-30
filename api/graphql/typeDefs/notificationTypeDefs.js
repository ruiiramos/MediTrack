import { gql } from 'graphql-tag';

const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    medication_id: ID!
    alert_time: String!
    status: String!
  }

  type Query {
    getNotifications: [Notification]
  }

  type Mutation {
    scheduleNotifications: String
    markNotificationsAsForgotten: String
    markNotificationAsTaken(id: ID!): String
  }
`;

export default notificationTypeDefs;