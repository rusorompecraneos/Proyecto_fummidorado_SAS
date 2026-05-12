import serviciosService from '../services/servicios.service.js';

// Vistas de HDS, FT y Diagramas UPC. 
const mostrarHdsFt        = (req, res) => res.render('documentosTecnicoCliente/hds-ft', { rol: 'tecnico' });
const mostrarDiagramasUpc = (req, res) => res.render('documentosTecnicoCliente/diagramas-upc', { rol: 'tecnico' });


// Servicios de hoy del tecnico. 
/*
  const mostrarServiciosHoy = (req, res) => {
  const servicios    = serviciosService.obtenerServiciosHoy();
  const estadisticas = serviciosService.obtenerEstadisticas();
  res.render('tecnico/servicios-hoy', { servicios, estadisticas });
};
  */
export default {mostrarHdsFt, mostrarDiagramasUpc };

