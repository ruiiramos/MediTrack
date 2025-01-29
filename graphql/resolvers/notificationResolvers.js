import Notification from '../models/Notification.js';
import Medication from '../models/Medication.js';

const notificationResolvers = {
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
  },
};

export default notificationResolvers;