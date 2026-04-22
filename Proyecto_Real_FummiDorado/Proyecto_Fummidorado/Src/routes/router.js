import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";

import { listarTiposServicio } from "../controllers/tipoServicioController.js";
import { listarProductos } from "../controllers/productoController.js";
import { listarOrdenes, verOrden } from "../controllers/ordenServicioController.js";
import { listarFormularios, verFormulario, editarFormulario, guardarFormulario } from "../controllers/formularioController.js";

const router = Router();

router.get('/', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.redirect(`/dashboard/${req.session.user.rol}`);
});

// ── Tipos de Servicio: solo admin ─────────────────────────────
router.get('/tipoServicio',
    requireAuth,
    requireRole('admin'),
    listarTiposServicio
);

// ── Productos: solo admin ─────────────────────────────────────
router.get('/producto',
    requireAuth,
    requireRole('admin'),
    listarProductos
);

// ── Órdenes de Servicio: admin, técnico y cliente ─────────────
router.get('/ordenServicio',
    requireAuth,
    requireRole('admin', 'tecnico', 'cliente'),
    listarOrdenes
);

router.get('/ordenServicio/:id',
    requireAuth,
    requireRole('admin', 'tecnico', 'cliente'),
    verOrden
);

// ── Formularios: admin, técnico y cliente ─────────────────────
router.get('/formulario',
    requireAuth,
    requireRole('admin', 'tecnico', 'cliente'),
    listarFormularios
);

router.get('/formulario/:id',
    requireAuth,
    requireRole('admin', 'tecnico', 'cliente'),
    verFormulario
);

// Editar formulario: solo admin y técnico
router.get('/formulario/:id/editar',
    requireAuth,
    requireRole('admin', 'tecnico'),
    editarFormulario
);

router.post('/formulario/:id/editar',
    requireAuth,
    requireRole('admin', 'tecnico'),
    guardarFormulario
);

export default router;
