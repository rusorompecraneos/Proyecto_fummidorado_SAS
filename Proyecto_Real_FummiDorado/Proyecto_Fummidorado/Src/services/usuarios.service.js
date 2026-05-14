import pool from '../config/db.js';

const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM usuarios ORDER BY created_at DESC');
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const crear = async (datos) => {
  const { nombre, correo, usuario, password, rol } = datos;
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, correo, usuario, password, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, correo, usuario, password, rol]
  );
  return result.rows[0];
};

const actualizar = async (id, datos) => {
  const { nombre, correo, usuario, password, rol } = datos;
  const result = await pool.query(
    'UPDATE usuarios SET nombre=$1, correo=$2, usuario=$3, password=$4, rol=$5 WHERE id=$6 RETURNING *',
    [nombre, correo, usuario, password, rol, id]
  );
  return result.rows[0] || null;
};

const eliminar = async (id) => {
  const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
  return result.rowCount > 0;
};

const existeUsuario = async (usuario, excludeId = null) => {
  const query  = excludeId
    ? 'SELECT id FROM usuarios WHERE usuario = $1 AND id != $2'
    : 'SELECT id FROM usuarios WHERE usuario = $1';
  const params = excludeId ? [usuario, excludeId] : [usuario];
  const result = await pool.query(query, params);
  return result.rows.length > 0;
};

const existeCorreo = async (correo, excludeId = null) => {
  const query  = excludeId
    ? 'SELECT id FROM usuarios WHERE correo = $1 AND id != $2'
    : 'SELECT id FROM usuarios WHERE correo = $1';
  const params = excludeId ? [correo, excludeId] : [correo];
  const result = await pool.query(query, params);
  return result.rows.length > 0;
};

const buscarPorCredenciales = async (usuario) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE usuario = $1 AND activo = TRUE',
    [usuario]
  );
  return result.rows[0] || null;
};

export default {
  obtenerTodos, obtenerPorId, crear, actualizar,
  eliminar, existeUsuario, existeCorreo, buscarPorCredenciales
};