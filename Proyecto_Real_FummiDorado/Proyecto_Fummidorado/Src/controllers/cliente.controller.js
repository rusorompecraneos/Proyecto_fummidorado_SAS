// Agrega esto en cliente.controller.js Y en tecnico.controller.js

const mostrarHdsFt        = (req, res) => res.render('documentosTecnicoCliente/hds-ft');
const mostrarDiagramasUpc = (req, res) => res.render('documentosTecnicoCliente/diagramas-upc');

export default { mostrarHdsFt, mostrarDiagramasUpc };