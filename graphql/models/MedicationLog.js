import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Medication from './Medication.js';

const MedicationLog = sequelize.define('MedicationLog', {
  medication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'medication', key: 'id' },
    onDelete: 'CASCADE',
  },
  taken_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('taken', 'missed'),
    allowNull: false,
  },
}, {
  tableName: 'medication_log',
  timestamps: false,
});

MedicationLog.belongsTo(Medication, { foreignKey: 'medication_id', onDelete: 'CASCADE' });

export default MedicationLog;