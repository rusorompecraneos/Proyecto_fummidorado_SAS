import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nit: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  contacto: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  sede: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  sedes: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'clientes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default Cliente;
