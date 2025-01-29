import userResolvers from './userResolvers.js';
import notificationResolvers from './notificationResolvers.js';
import medicationResolvers from './medicationResolvers.js';
import medicationLogResolvers from './medicationLogResolvers.js';

const resolvers = [userResolvers, notificationResolvers, medicationResolvers, medicationLogResolvers];

export default resolvers;