import express from 'express';
import adminController from '../controllers/admin.controller.js';

const router = express.Router();

// Servicios
router.get('/servicios',               adminController.mostrarGestionServicios);
router.get('/servicios/:id',           adminController.mostrarDetalleServicio);

// Documentos
router.get('/documentos-selector',     adminController.mostrarSelectorDocumentos);
router.get('/documentos/hds-ft',       adminController.mostrarHdsFt);
router.get('/documentos/diagramas-upc', adminController.mostrarDiagramasUpc);

// Cliente
router.get('/gestion-clientes',                 adminController.mostrarGestionClientes);
router.post('/gestion-clientes/crear',          adminController.crearCliente);
router.post('/gestion-clientes/editar',         adminController.actualizarCliente);
router.post('/gestion-clientes/eliminar',       adminController.eliminarCliente);

// Usuarios
router.get('/gestion-usuarios',          adminController.mostrarGestionUsuarios);
router.post('/gestion-usuarios/crear',   adminController.crearUsuario);
router.post('/gestion-usuarios/editar',  adminController.actualizarUsuario);
router.post('/gestion-usuarios/eliminar',adminController.eliminarUsuario);

export default router;