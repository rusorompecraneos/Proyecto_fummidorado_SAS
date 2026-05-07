import serviciosService from '../services/servicios.service.js';

const mostrarGestionServicios = (req, res) => {
  const servicios = serviciosService.obtenerTodos();
  res.render('admin/gestion-servicios', { servicios });
};

const mostrarDetalleServicio = (req, res) => {
  const servicio = serviciosService.obtenerPorId(req.params.id);
  if (!servicio) return res.redirect('/admin/servicios');
  res.render('admin/detalle-servicio', { servicio });
};

const mostrarSelectorDocumentos = (req, res) => {
  res.render('admin/documentos-selector');
};

const mostrarHdsFt = (req, res) => {
  res.render('documentosTecnicoCliente/hds-ft', { rol: 'admin' });
};

const mostrarDiagramasUpc = (req, res) => {
  res.render('documentosTecnicoCliente/diagramas-upc', { rol: 'admin' });
};

export default {
  mostrarGestionServicios,
  mostrarDetalleServicio,
  mostrarSelectorDocumentos,
  mostrarHdsFt,
  mostrarDiagramasUpc
};