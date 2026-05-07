import express from 'express';
import adminController from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/servicios',               adminController.mostrarGestionServicios);
router.get('/servicios/:id',           adminController.mostrarDetalleServicio);
router.get('/documentos-selector',     adminController.mostrarSelectorDocumentos);
router.get('/documentos/hds-ft',       adminController.mostrarHdsFt);
router.get('/documentos/diagramas-upc', adminController.mostrarDiagramasUpc);

export default router;