import { gql } from 'graphql-tag';

const notificationTypeDefs = gql`
  type Notification {
    id: ID!
    medication_id: ID!
    alert_time: String!
    status: String!
  }

  input NotificationInput {
    medication_id: ID!
    alert_time: String!
    status: String!
  }

  type Query {
    getNotifications(userId: ID!): [Notification]
  }

  type Mutation {
    addNotification(input: NotificationInput!): Notification
    updateNotification(id: ID!, input: NotificationInput!): Notification
    deleteNotification(id: ID!): Boolean
    markNotificationAsRead(id: ID!): Notification
  }
`;

export default notificationTypeDefs;