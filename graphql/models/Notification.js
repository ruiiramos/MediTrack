import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.config.js';

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  medication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'medication', key: 'id' },
    onDelete: 'CASCADE',
  },
  alert_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'taken', 'forgotten'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'notification',
  timestamps: false,
});

export default Notification;