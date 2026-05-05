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

export default { mostrarGestionServicios, mostrarDetalleServicio };

