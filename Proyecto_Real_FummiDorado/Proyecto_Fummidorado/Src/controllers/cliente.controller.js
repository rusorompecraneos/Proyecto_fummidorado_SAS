// Agrega esto en cliente.controller.js Y en tecnico.controller.js

const mostrarHdsFt        = (req, res) => res.render('documentosTecnicoCliente/hds-ft', { rol: 'cliente' });
const mostrarDiagramasUpc = (req, res) => res.render('documentosTecnicoCliente/diagramas-upc', { rol: 'cliente' });
const mostrarPrograma = (req, res) => res.render('Usuario/cliente/programa', { rol: 'cliente' });

const mostrarGestionClientes = async (req, res) => {
  try {
    const clientes = await clientesService.obtenerTodos();
    const mensaje  = req.query.mensaje || null;
    res.render('admin/gestion-clientes', { clientes, mensaje });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error interno del servidor');
  }
};

export default { mostrarHdsFt, mostrarDiagramasUpc, mostrarPrograma, mostrarGestionClientes };
