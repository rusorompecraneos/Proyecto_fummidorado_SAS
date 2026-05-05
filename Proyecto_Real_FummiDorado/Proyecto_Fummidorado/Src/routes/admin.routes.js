import express from 'express';
import adminController from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/servicios',         adminController.mostrarGestionServicios);
router.get('/servicios/:id',     adminController.mostrarDetalleServicio);

export default router;

