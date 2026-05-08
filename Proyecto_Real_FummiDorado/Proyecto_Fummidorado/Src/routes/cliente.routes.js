// En cliente.routes.js

import express from 'express';
import { Router } from "express";
import clienteController from '../controllers/cliente.controller.js';


const router = express.Router();


router.get('/hds-ft',        clienteController.mostrarHdsFt);
router.get('/diagramas-upc', clienteController.mostrarDiagramasUpc);

router.get('/programa', clienteController.mostrarPrograma);

export default router;
