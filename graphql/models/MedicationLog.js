import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import Medication from './Medication.js';
import User from './User.js';

const MedicationLog = sequelize.define('MedicationLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  medication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Medication, key: 'id' },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
    onDelete: 'CASCADE',
  },
  taken_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
MedicationLog.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default MedicationLog;
