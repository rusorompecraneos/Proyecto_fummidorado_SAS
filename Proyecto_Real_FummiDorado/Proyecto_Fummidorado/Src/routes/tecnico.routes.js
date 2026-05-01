// En tecnico.routes.js

import express from 'express';
import { Router } from "express";
import tecnicoController from '../controllers/tecnico.controller.js';


const router = express.Router();

router.get('/hds-ft',        tecnicoController.mostrarHdsFt);
router.get('/diagramas-upc', tecnicoController.mostrarDiagramasUpc);

export default router;