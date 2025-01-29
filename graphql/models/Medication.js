import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';
import User from './User.js';

const Medication = sequelize.define('Medication', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('pill', 'syrup', 'injection'),
    allowNull: false,
  },
  frequency: {
    type: DataTypes.INTEGER,
  },
  start_time: {
    type: DataTypes.TIME,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'medication',
  timestamps: false,
});

Medication.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Medication;