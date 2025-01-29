import Medication from '../models/Medication.js';
import MedicationLog from '../models/MedicationLog.js';

const medicationResolvers = {
  Query: {
    getMedications: async (_, { userId }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }
      try {
        return await Medication.findAll({ 
          where: { user_id: userId }, 
          include: [{ model: MedicationLog }] // Inclui os logs
        });
      } catch (error) {
        console.error("Erro ao obter medicações:", error);
        throw new Error("Não foi possível obter as medicações.");
      }
    },

    getMedication: async (_, { id }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }
      try {
        const medication = await Medication.findByPk(id, {
          include: [{ model: MedicationLog }] // Inclui os logs no resultado
        });
        if (!medication) throw new Error("Medicação não encontrada.");
        return medication;
      } catch (error) {
        console.error("Erro ao obter medicação:", error);
        throw new Error("Não foi possível obter a medicação.");
      }
    },
  },

  Mutation: {
    addMedication: async (_, { input }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }
      
      try {
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

        // Apagar primeiro os logs antes da medicação
        await MedicationLog.destroy({ where: { medication_id: id } });
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
