import express from 'express';
import session from 'express-session';
import { join } from "path";

import appRouter from "./routes/router.js";
import { verLogin, procesarLogin, cerrarSesion } from "./controllers/usuarioController.js";

const app = express();
const port = 3000;

app.set("view engine", 'ejs');
app.set("views", "views");
app.use(express.static(join("./public")));
app.use(express.urlencoded({ extended: true }));

// ── Sesiones ──────────────────────────────────────────────────
app.use(session({
    secret: 'fumidorado_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 } // 8 horas
}));

// Hace que `user` esté disponible en todos los EJS automáticamente
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// ── Rutas de la app ───────────────────────────────────────────
app.use("/", appRouter);

// ── Login / Logout ────────────────────────────────────────────
app.get('/login', verLogin);
app.post('/usuario/login', procesarLogin);
app.get('/usuario/logout', cerrarSesion);

// ── Dashboards ────────────────────────────────────────────────
app.get('/dashboard/admin', (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'admin') return res.redirect('/login');
    res.render('Usuario/dashboards/admin');
});

app.get('/dashboard/tecnico', (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'tecnico') return res.redirect('/login');
    res.render('Usuario/dashboards/tecnico');
});

app.get('/dashboard/cliente', (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'cliente') return res.redirect('/login');
    res.render('Usuario/dashboards/cliente');
});

app.listen(port, () => {
    console.log(`Server running 🚀 at http://localhost:${port}`);
});
