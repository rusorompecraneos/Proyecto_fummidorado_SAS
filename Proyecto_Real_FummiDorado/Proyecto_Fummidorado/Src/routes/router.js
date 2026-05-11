import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

import { listarTiposServicio } from "../controllers/tipoServicioController.js";

import {
  listarProductos,
  crearProducto,
  editarProducto,
  eliminarProducto
} from "../controllers/productoController.js";

import { 
  listarOrdenes, 
  verOrden, 
  crearOrden,
  mostrarEditar,
  editarOrden,
  resumenServicios
} from "../controllers/ordenServicioController.js";

import {
  verFormulario
} from "../controllers/formularioController.js";

// 🔥 NUEVO (REPORTES)
import { listarReportes } from "../controllers/reporteController.js";

const router = Router();

// Ruta principal
router.get('/', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.redirect(`/dashboard/${req.session.user.rol}`);
});

// ── Tipos de Servicio ─────────────────────────
router.get('/tipoServicio',
  requireAuth,
  requireRole('admin'),
  listarTiposServicio
);

// ── Productos ─────────────────────────────────
router.get('/producto',
  requireAuth,
  requireRole('admin'),
  listarProductos
);

router.post('/producto',
  requireAuth,
  requireRole('admin'),
  crearProducto
);

router.post('/producto/editar/:id',
  requireAuth,
  requireRole('admin'),
  editarProducto
);

router.get('/producto/eliminar/:id',
  requireAuth,
  requireRole('admin'),
  eliminarProducto
);

// ── Órdenes de Servicio ───────────────────────

// LISTAR
router.get('/ordenServicio',
  requireAuth,
  requireRole('admin', 'tecnico', 'cliente'),
  listarOrdenes
);

// CREAR
router.post('/ordenServicio',
  requireAuth,
  requireRole('admin'),
  crearOrden
);

// VER DETALLE
router.get('/ordenServicio/:id',
  requireAuth,
  requireRole('admin', 'tecnico', 'cliente'),
  verOrden
);

// MOSTRAR EDITAR
router.get('/ordenServicio/editar/:id',
  requireAuth,
  requireRole('admin'),
  mostrarEditar
);

// ── Formularios: admin, técnico y cliente ─────────────────────
router.get('/formulario',
    requireAuth,
    requireRole('admin', 'tecnico', 'cliente'),
    listarFormularios
);

// GUARDAR EDICIÓN
router.post('/ordenServicio/editar/:id',
  requireAuth,
  requireRole('admin'),
  editarOrden
);

// ── Formulario Técnico ───────────────────────

router.get('/formulario/:id',

  requireAuth,
  requireRole('admin', 'tecnico'),

  verFormulario

);

// ── Reportes ──────────────────────────────────

// 🔥 NUEVA VISTA DE REPORTES
router.get('/reportes',
  requireAuth,
  requireRole('admin'),
  listarReportes
);

// ── RESUMEN SERVICIOS TÉCNICO ─────────────────────

router.get('/tecnico/resumen',
    requireAuth,
    requireRole('tecnico'),
    resumenServicios
);

export default router;

