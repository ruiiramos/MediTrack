import MedicationLog from '../models/MedicationLog.js';
import Medication from '../models/Medication.js';

const medicationLogResolvers = {
  Query: {
    getMedicationLogs: async (_, { medicationId }, context) => {
      if (!context.user.loggedIn) {
        throw new Error("Unauthorized");
      }

      try {
        // Buscar a medicação associada para verificar a end_date
        const medication = await Medication.findByPk(medicationId);
        if (!medication) throw new Error("Medicação não encontrada.");

        const currentDate = new Date();

        // Buscar os logs do medicamento específico
        const logs = await MedicationLog.findAll({
          where: { medication_id: medicationId },
        });

        // Separar os logs em "active" e "expired" com base na end_date
        const active = logs.filter(log => new Date(medication.end_date) >= currentDate);
        const expired = logs.filter(log => new Date(medication.end_date) < currentDate);

        return { active, expired };
      } catch (error) {
        console.error("Erro ao obter histórico de medicação:", error);
        throw new Error("Não foi possível obter o histórico de medicação.");
      }
    },
  },
};

export default medicationLogResolvers;
