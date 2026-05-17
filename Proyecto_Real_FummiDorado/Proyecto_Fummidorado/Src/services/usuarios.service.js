import { Usuario } from '../models/index.js';

const obtenerTodos = async () => {
  return await Usuario.findAll({ order: [['created_at', 'DESC']] });
};

const obtenerPorId = async (id) => {
  return await Usuario.findByPk(id);
};

const crear = async (datos) => {
  return await Usuario.create(datos);
};

const actualizar = async (id, datos) => {
  await Usuario.update(datos, { where: { id } });
  return obtenerPorId(id);
};

const eliminar = async (id) => {
  const result = await Usuario.destroy({ where: { id } });
  return result > 0;
};

const existeUsuario = async (usuario, excludeId = null) => {
  const { Op } = await import('sequelize');
  const where = excludeId
    ? { usuario, id: { [Op.ne]: excludeId } }
    : { usuario };
  const found = await Usuario.findOne({ where });
  return !!found;
};

const existeCorreo = async (correo, excludeId = null) => {
  const { Op } = await import('sequelize');
  const where = excludeId
    ? { correo, id: { [Op.ne]: excludeId } }
    : { correo };
  const found = await Usuario.findOne({ where });
  return !!found;
};

const buscarPorCredenciales = async (usuario) => {
  return await Usuario.findOne({ where: { usuario, activo: true } });
};

export default {
  obtenerTodos, obtenerPorId, crear, actualizar,
  eliminar, existeUsuario, existeCorreo, buscarPorCredenciales
};