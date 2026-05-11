import serviciosService from '../services/servicios.service.js';
import clientesService from '../services/gestion-clientes.service.js';
import usuariosService  from '../services/gestion-usuarios.service.js';

// SERVICIOS
const mostrarGestionServicios = (req, res) => {
  const servicios = serviciosService.obtenerTodos();
  res.render('admin/gestion-servicios', { servicios });
};

const mostrarDetalleServicio = (req, res) => {
  const servicio = serviciosService.obtenerPorId(req.params.id);
  if (!servicio) return res.redirect('/admin/servicios');
  res.render('admin/detalle-servicio', { servicio });
};

// DOCUMENTOS 
const mostrarSelectorDocumentos = (req, res) => {
  res.render('admin/documentos-selector');
};

const mostrarHdsFt = (req, res) => {
  res.render('documentosTecnicoCliente/hds-ft', { rol: 'admin' });
};

const mostrarDiagramasUpc = (req, res) => {
  res.render('documentosTecnicoCliente/diagramas-upc', { rol: 'admin' });
};

// CLIENTE
const mostrarGestionClientes = (req, res) => {
  const clientes = clientesService.obtenerTodos();
  const mensaje  = req.query.mensaje || null;
  res.render('admin/gestion-clientes', { clientes, mensaje });
};

const crearCliente = (req, res) => {
  const { nombre, nit, contacto, telefono, correo, direccion, sede } = req.body;

  // Validaciones backend
  const errores = [];
  if (!nombre   || nombre.trim()   === '') errores.push('El nombre es requerido.');
  if (!nit      || nit.trim()      === '') errores.push('El NIT es requerido.');
  if (!contacto || contacto.trim() === '') errores.push('El contacto es requerido.');
  if (!telefono || !/^\d{7,15}$/.test(telefono.trim())) errores.push('El teléfono debe tener entre 7 y 15 dígitos.');
  if (!correo   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.push('El correo no es válido.');
  if (!direccion|| direccion.trim()===  '') errores.push('La dirección es requerida.');
  if (!sede     || sede.trim()     === '') errores.push('El nombre de la sede es requerido.');

  if (errores.length > 0) {
    const clientes = clientesService.obtenerTodos();
    return res.render('admin/gestion-clientes', { clientes, mensaje: null, errores });
  }

  clientesService.crear({ nombre, nit, contacto, telefono, correo, direccion, sede });
  res.redirect('/admin/gestion-clientes?mensaje=creado');
};

const actualizarCliente = (req, res) => {
  const { id, nombre, nit, contacto, telefono, correo, direccion, sede } = req.body;

  const errores = [];
  if (!nombre   || nombre.trim()   === '') errores.push('El nombre es requerido.');
  if (!nit      || nit.trim()      === '') errores.push('El NIT es requerido.');
  if (!contacto || contacto.trim() === '') errores.push('El contacto es requerido.');
  if (!telefono || !/^\d{7,15}$/.test(telefono.trim())) errores.push('El teléfono debe tener entre 7 y 15 dígitos.');
  if (!correo   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.push('El correo no es válido.');
  if (!direccion|| direccion.trim() === '') errores.push('La dirección es requerida.');
  if (!sede     || sede.trim()      === '') errores.push('El nombre de la sede es requerido.');

  if (errores.length > 0) {
    const clientes = clientesService.obtenerTodos();
    return res.render('admin/gestion-clientes', { clientes, mensaje: null, errores });
  }

  const actualizado = clientesService.actualizar(id, { nombre, nit, contacto, telefono, correo, direccion, sede });
  if (!actualizado) return res.redirect('/admin/gestion-clientes?mensaje=error');
  res.redirect('/admin/gestion-clientes?mensaje=editado');
};

const eliminarCliente = (req, res) => {
  const { id } = req.body;
  clientesService.eliminar(id);
  res.redirect('/admin/gestion-clientes?mensaje=eliminado');
};

// USUARIOS
const mostrarGestionUsuarios = (req, res) => {
  const usuarios = usuariosService.obtenerTodos();
  const mensaje  = req.query.mensaje || null;
  res.render('admin/gestion-usuarios', { usuarios, mensaje });
};

const crearUsuario = (req, res) => {
  const { nombre, correo, usuario, password, rol } = req.body;
  const errores = [];
  if (!nombre   || nombre.trim()   === '') errores.push('El nombre es requerido.');
  if (!correo   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.push('El correo no es válido.');
  if (!usuario  || usuario.trim()  === '') errores.push('El usuario es requerido.');
  if (!password || password.length < 6)   errores.push('La contraseña debe tener mínimo 6 caracteres.');
  if (!rol      || !['tecnico', 'cliente', 'admin'].includes(rol)) errores.push('El rol no es válido.');
  if (usuariosService.existeUsuario(usuario)) errores.push('El nombre de usuario ya está en uso.');
  if (usuariosService.existeCorreo(correo))   errores.push('El correo ya está registrado.');

  if (errores.length > 0) {
    const usuarios = usuariosService.obtenerTodos();
    return res.render('admin/gestion-usuarios', { usuarios, mensaje: null, errores });
  }
  usuariosService.crear({ nombre, correo, usuario, password, rol });
  res.redirect('/admin/gestion-usuarios?mensaje=creado');
};

const actualizarUsuario = (req, res) => {
  const { id, nombre, correo, usuario, password, rol } = req.body;
  const errores = [];
  if (!nombre   || nombre.trim()   === '') errores.push('El nombre es requerido.');
  if (!correo   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) errores.push('El correo no es válido.');
  if (!usuario  || usuario.trim()  === '') errores.push('El usuario es requerido.');
  if (!password || password.length < 6)   errores.push('La contraseña debe tener mínimo 6 caracteres.');
  if (!rol      || !['tecnico', 'cliente', 'admin'].includes(rol)) errores.push('El rol no es válido.');
  if (usuariosService.existeUsuario(usuario, id)) errores.push('El nombre de usuario ya está en uso.');
  if (usuariosService.existeCorreo(correo, id))   errores.push('El correo ya está registrado.');

  if (errores.length > 0) {
    const usuarios = usuariosService.obtenerTodos();
    return res.render('admin/gestion-usuarios', { usuarios, mensaje: null, errores });
  }
  usuariosService.actualizar(id, { nombre, correo, usuario, password, rol });
  res.redirect('/admin/gestion-usuarios?mensaje=editado');
};

const eliminarUsuario = (req, res) => {
  usuariosService.eliminar(req.body.id);
  res.redirect('/admin/gestion-usuarios?mensaje=eliminado');
};

export default {
  mostrarGestionServicios, mostrarDetalleServicio,
  mostrarSelectorDocumentos, mostrarHdsFt, mostrarDiagramasUpc,
  mostrarGestionClientes, crearCliente, actualizarCliente, eliminarCliente,
  mostrarGestionUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario
};

