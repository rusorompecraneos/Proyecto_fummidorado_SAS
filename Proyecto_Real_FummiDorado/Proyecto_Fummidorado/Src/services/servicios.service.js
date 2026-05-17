import { Servicio } from '../models/index.js';

const obtenerTodos = async () => {
  return await Servicio.findAll({ order: [['created_at', 'DESC']] });
};

const obtenerPorId = async (id) => {
  return await Servicio.findByPk(id);
};

const obtenerServiciosHoy = async () => {
  const hoy = new Date().toLocaleDateString('es-CO');
  return await Servicio.findAll({
    where: { fecha: hoy },
    order: [['hora', 'ASC']]
  });
};

const obtenerEstadisticas = async () => {
  const servicios   = await obtenerServiciosHoy();
  const total       = servicios.length;
  const completados = servicios.filter(s => s.estado === 'Completado').length;
  const pendientes  = servicios.filter(s => s.estado === 'Pendiente').length;
  return { total, completados, pendientes };
};

const crear = async (datos) => {
  return await Servicio.create(datos);
};

const actualizar = async (id, datos) => {
  await Servicio.update(datos, { where: { id } });
  return obtenerPorId(id);
};

const eliminar = async (id) => {
  const result = await Servicio.destroy({ where: { id } });
  return result > 0;
};

export default {
  obtenerTodos, obtenerPorId, obtenerServiciosHoy,
  obtenerEstadisticas, crear, actualizar, eliminar
};