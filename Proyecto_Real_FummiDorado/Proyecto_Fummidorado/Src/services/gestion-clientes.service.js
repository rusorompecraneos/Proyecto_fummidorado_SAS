import { Cliente } from '../models/index.js';

const obtenerTodos = async () => {
  return await Cliente.findAll({ order: [['created_at', 'DESC']] });
};

const obtenerPorId = async (id) => {
  return await Cliente.findByPk(id);
};

const crear = async (datos) => {
  return await Cliente.create(datos);
};

const actualizar = async (id, datos) => {
  await Cliente.update(datos, { where: { id } });
  return obtenerPorId(id);
};

const eliminar = async (id) => {
  const result = await Cliente.destroy({ where: { id } });
  return result > 0;
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
