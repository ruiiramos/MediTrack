import Medication from '../models/Medication.js';
import { Op } from 'sequelize';

const medicationResolvers = {
  Query: {
    getCurrentMedications: async (_, {}, context) => {
      if (!context.user.id) {
        throw new Error("Unauthorized");
      }
      try {
        const today = new Date();
        return await Medication.findAll({
          where: {
            user_id: context.user.id,
            end_date: {
              [Op.gt]: today
            }
          }
        });
      } catch (error) {
        console.error("Erro ao obter medicações atuais:", error);
        throw new Error("Não foi possível obter as medicações atuais.");
      }
    },

    getHistoricalMedications: async (_, {}, context) => {
      if (!context.user.id) {
        throw new Error("Unauthorized");
      }
      try {
        const today = new Date();
        return await Medication.findAll({
          where: {
            user_id: context.user.id,
            end_date: {
              [Op.lte]: today // end_date já passou
            }
          }
        });
      } catch (error) {
        console.error("Erro ao obter histórico de medicações:", error);
        throw new Error("Não foi possível obter o histórico de medicações.");
      }
    },
  },

  Mutation: {
    addMedication: async (_, { input }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }
      
      try {
        console.log(context.user.id);
        const medication = await Medication.create({
          ...input,
          user_id: context.user.id,
        });
        console.log("Medicação adicionada:", medication);
        return medication;
      } catch (error) {
        console.error("Erro ao adicionar medicação:", error.message, error.stack);
        throw new Error("Não foi possível adicionar a medicação.");
      }
    },

    updateMedication: async (_, { id, input }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }
      try {
        const medication = await Medication.findByPk(id);
        if (!medication) throw new Error("Medicação não encontrada.");

        await medication.update(input);
        return medication;
      } catch (error) {
        console.error("Erro ao atualizar medicação:", error);
        throw new Error("Não foi possível atualizar a medicação.");
      }
    },

    deleteMedication: async (_, { id }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }
      try {
        const medication = await Medication.findByPk(id);
        if (!medication) throw new Error("Medicação não encontrada.");

        await medication.destroy();
        return true;
      } catch (error) {
        console.error("Erro ao remover medicação:", error);
        return false;
      }
    },
  },
};

export default medicationResolvers;