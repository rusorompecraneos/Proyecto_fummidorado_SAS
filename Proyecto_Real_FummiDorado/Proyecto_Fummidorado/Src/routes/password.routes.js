import express from 'express';
import passwordController from '../controllers/password.controller.js';

const router = express.Router();

router.get('/recuperar',      passwordController.mostrarRecuperar);
router.post('/recuperar',     passwordController.irAVerificar);

router.get('/verificar',      passwordController.mostrarVerificar);
router.post('/verificar',     passwordController.irANuevaPassword);

router.get('/nueva-password', passwordController.mostrarNuevaPassword);
router.post('/nueva-password',passwordController.irALogin);

export default router;