import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Servicio = sequelize.define('Servicio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tecnico_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cliente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  sede: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  tecnico: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  fecha: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  hora: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'En proceso', 'Completado'),
    defaultValue: 'Pendiente'
  }
}, {
  tableName: 'servicios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default Servicio;