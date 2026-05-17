import sequelize from '../config/db.js';
import Usuario  from './Usuario.js';
import Cliente  from './Cliente.js';
import Servicio from './Servicio.js';

// Relaciones
Cliente.hasMany(Servicio,  { foreignKey: 'cliente_id' });
Servicio.belongsTo(Cliente,{ foreignKey: 'cliente_id' });

Usuario.hasMany(Servicio,  { foreignKey: 'tecnico_id' });
Servicio.belongsTo(Usuario,{ foreignKey: 'tecnico_id' });

export { sequelize, Usuario, Cliente, Servicio };