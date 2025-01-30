import { Op } from 'sequelize';
import Notification from '../models/Notification.js';
import Medication from '../models/Medication.js';

const notificationResolvers = {
  Query: {
    getNotifications: async () => {
      try {
        const notifications = await Notification.findAll();
        return notifications;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch notifications");
      }
    },
  },
  Mutation: {
    scheduleNotifications: async () => {
      try {
        const medications = await Medication.findAll();

        medications.forEach(async (medication) => {
          const { id, name, dosage, start_time, frequency, start_date, end_date } = medication;
          const startTime = new Date(start_date);
          startTime.setHours(start_time.split(':')[0], start_time.split(':')[1]);

          const endTime = new Date(end_date);
          let currentTime = new Date(startTime);

          while (currentTime <= endTime) {
            await Notification.create({
              medication_id: id,
              alert_time: new Date(currentTime),
              status: 'pending',
            });

            currentTime.setHours(currentTime.getHours() + frequency);
          }
        });

        return "Notifications scheduled successfully";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to schedule notifications");
      }
    },
    markNotificationsAsForgotten: async () => {
      try {
        const now = new Date();
        await Notification.update(
          { status: 'forgotten' },
          {
            where: {
              alert_time: {
                [Op.lt]: now,
              },
              status: 'pending',
            },
          }
        );
        return "Notifications updated to forgotten";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update notifications to forgotten");
      }
    },
    markNotificationAsTaken: async (_, { id }) => {
      try {
        await Notification.update(
          { status: 'taken' },
          {
            where: {
              id: id,
            },
          }
        );
        return "Notification marked as taken";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to mark notification as taken");
      }
    },
  },
};

export default notificationResolvers;