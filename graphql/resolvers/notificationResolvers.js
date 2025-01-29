import Notification from '../models/Notification.js';

const notificationResolvers = {
  Query: {
    getNotifications: async (_, { userId }) => {
      try {
        return await Notification.findAll({ where: { userId } });
      } catch (error) {
        console.error("Erro ao obter notificações:", error);
        throw new Error("Não foi possível obter as notificações.");
      }
    },
  },

  Mutation: {
    addNotification: async (_, { input }) => {
      try {
        const notification = await Notification.create(input);
        console.log("Notificação adicionada:", notification);
        return notification;
      } catch (error) {
        console.error("Erro ao adicionar notificação:", error);
        throw new Error("Não foi possível adicionar a notificação.");
      }
    },

    updateNotification: async (_, { id, input }) => {
      try {
        const notification = await Notification.findByPk(id);
        if (!notification) throw new Error("Notificação não encontrada.");

        await notification.update(input);
        return notification;
      } catch (error) {
        console.error("Erro ao atualizar notificação:", error);
        throw new Error("Não foi possível atualizar a notificação.");
      }
    },

    deleteNotification: async (_, { id }) => {
      try {
        const notification = await Notification.findByPk(id);
        if (!notification) throw new Error("Notificação não encontrada.");

        await notification.destroy();
        return true;
      } catch (error) {
        console.error("Erro ao remover notificação:", error);
        return false;
      }
    },

    markNotificationAsRead: async (_, { id }) => {
      try {
        const notification = await Notification.findByPk(id);
        if (!notification) throw new Error("Notificação não encontrada.");

        await notification.update({ status: 'read' });
        return notification;
      } catch (error) {
        console.error("Erro ao marcar notificação como lida:", error);
        throw new Error("Não foi possível atualizar a notificação.");
      }
    },
  },
};

export default notificationResolvers;