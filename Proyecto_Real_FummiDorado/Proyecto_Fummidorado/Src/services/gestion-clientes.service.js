import pool from '../config/db.js';

const obtenerTodos = async () => {
  const result = await pool.query('SELECT * FROM clientes ORDER BY created_at DESC');
  return result.rows;
};

const obtenerPorId = async (id) => {
  const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
  return result.rows[0] || null;
};

const crear = async (datos) => {
  const { nombre, nit, contacto, telefono, correo, direccion, sede } = datos;
  const result = await pool.query(
    `INSERT INTO clientes (nombre, nit, contacto, telefono, correo, direccion, sede)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [nombre, nit, contacto, telefono, correo, direccion, sede]
  );
  return result.rows[0];
};

const actualizar = async (id, datos) => {
  const { nombre, nit, contacto, telefono, correo, direccion, sede } = datos;
  const result = await pool.query(
    `UPDATE clientes SET nombre=$1, nit=$2, contacto=$3, telefono=$4,
     correo=$5, direccion=$6, sede=$7 WHERE id=$8 RETURNING *`,
    [nombre, nit, contacto, telefono, correo, direccion, sede, id]
  );
  return result.rows[0] || null;
};

const eliminar = async (id) => {
  const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
  return result.rowCount > 0;
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };