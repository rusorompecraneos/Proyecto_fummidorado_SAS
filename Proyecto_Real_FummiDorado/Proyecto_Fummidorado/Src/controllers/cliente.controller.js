// Agrega esto en cliente.controller.js Y en tecnico.controller.js

const mostrarHdsFt        = (req, res) => res.render('documentosTecnicoCliente/hds-ft', { rol: 'cliente' });
const mostrarDiagramasUpc = (req, res) => res.render('documentosTecnicoCliente/diagramas-upc', { rol: 'cliente' });


export default { mostrarHdsFt, mostrarDiagramasUpc };