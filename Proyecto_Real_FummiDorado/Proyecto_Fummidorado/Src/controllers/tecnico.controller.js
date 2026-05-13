import serviciosService from '../services/servicios.service.js';
import mapaService from '../services/mapa.service.js';


// Vistas de HDS, FT y Diagramas UPC. 
const mostrarHdsFt        = (req, res) => res.render('documentosTecnicoCliente/hds-ft', { rol: 'tecnico' });
const mostrarDiagramasUpc = (req, res) => res.render('documentosTecnicoCliente/diagramas-upc', { rol: 'tecnico' });


const mostrarMapa = (req, res) => {
  const servicios = mapaService.obtenerServiciosSemana();
  // Pasamos los servicios como JSON para que Leaflet los use en el JS del EJS
  res.render('mapa-tecnico/mapa-servicios', {
    servicios,
    serviciosJSON: JSON.stringify(servicios),
    orsApiKey: process.env.ORS_API_KEY || ''
  });
};



export default {mostrarHdsFt, mostrarDiagramasUpc, mostrarMapa };

