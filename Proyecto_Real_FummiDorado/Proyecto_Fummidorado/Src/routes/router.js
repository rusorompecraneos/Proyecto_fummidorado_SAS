import { Router } from "express";
import { listarTiposServicio } from "../controllers/tipoServicioController.js";
import { listarProductos } from "../controllers/productoController.js";
import { listarOrdenes, verOrden } from "../controllers/ordenServicioController.js";
import { listarFormularios, verFormulario, editarFormulario, guardarFormulario } from "../controllers/formularioController.js";

const router = Router();

// Ruta principal
router.get('/', (request, response) => {
    response.render('index', {
        message: 'Hello'
    });
});

// Rutas de Tipo de Servicio
router.get('/tipoServicio', listarTiposServicio);

// Rutas de Producto
router.get('/producto', listarProductos);

// Rutas de Orden de Servicio
router.get('/ordenServicio', listarOrdenes);
router.get('/ordenServicio/:id', verOrden);

// Rutas de Formulario
router.get('/formulario', listarFormularios);
router.get('/formulario/:id', verFormulario);
router.get('/formulario/:id/editar', editarFormulario);
router.post('/formulario/:id/editar', guardarFormulario);

export default router;