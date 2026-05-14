import pool from '../config/db.js';

const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM servicios ORDER BY created_at DESC');
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const obtenerServiciosHoy = async () => {
  const hoy = new Date().toLocaleDateString('es-CO');
  const result = await pool.query(
    'SELECT * FROM servicios WHERE fecha = $1 ORDER BY hora ASC',
    [hoy]
  );
  return result.rows;
};

const obtenerEstadisticas = async () => {
  const servicios  = await obtenerServiciosHoy();
  const total      = servicios.length;
  const completados = servicios.filter(s => s.estado === 'Completado').length;
  const pendientes  = servicios.filter(s => s.estado === 'Pendiente').length;
  return { total, completados, pendientes };
};

const crear = async (datos) => {
  const { cliente_id, tecnico_id, cliente, sede, direccion, tecnico, fecha, hora, tipo, estado } = datos;
  const result = await pool.query(
    `INSERT INTO servicios (cliente_id, tecnico_id, cliente, sede, direccion, tecnico, fecha, hora, tipo, estado)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [cliente_id || null, tecnico_id || null, cliente, sede, direccion, tecnico, fecha, hora, tipo, estado || 'Pendiente']
  );
  return result.rows[0];
};

const actualizar = async (id, datos) => {
  const { cliente, sede, direccion, tecnico, fecha, hora, tipo, estado } = datos;
  const result = await pool.query(
    `UPDATE servicios SET cliente=$1, sede=$2, direccion=$3, tecnico=$4,
     fecha=$5, hora=$6, tipo=$7, estado=$8 WHERE id=$9 RETURNING *`,
    [cliente, sede, direccion, tecnico, fecha, hora, tipo, estado, id]
  );
  return result.rows[0] || null;
};

const eliminar = async (id) => {
  const result = await pool.query('DELETE FROM servicios WHERE id = $1', [id]);
  return result.rowCount > 0;
};

export default {
  obtenerTodos, obtenerPorId, obtenerServiciosHoy,
  obtenerEstadisticas, crear, actualizar, eliminar
};