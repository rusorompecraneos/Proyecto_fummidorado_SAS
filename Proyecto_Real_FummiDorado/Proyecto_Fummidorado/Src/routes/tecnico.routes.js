// En tecnico.routes.js

import express from 'express';
import { Router } from "express";
import tecnicoController from '../controllers/tecnico.controller.js';
import mapaController from '../controllers/mapaController.js';


const router = express.Router();

router.get('/hds-ft',        tecnicoController.mostrarHdsFt);
router.get('/diagramas-upc', tecnicoController.mostrarDiagramasUpc);
// router.get('/servicios-hoy', tecnicoController.mostrarServiciosHoy);


export default router;

