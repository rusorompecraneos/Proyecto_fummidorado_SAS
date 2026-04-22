import express from 'express';
import { join } from "path";
import session from 'express-session';

import appRouter from "./routes/router.js";
import { verLogin, procesarLogin, cerrarSesion } from "./controllers/usuarioController.js";

const app = express();
const port = 3000;

app.set("view engine", 'ejs');
app.set("views", "views");

app.use(express.static(join("./public")));
app.use(express.urlencoded({ extended: true }));

// ── Sesiones ─────────────────────────
app.use(session({
    secret: 'fumidorado_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 8 }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// ── Router principal ─────────────────
app.use("/", appRouter);

// ── Login / Logout ───────────────────
app.get('/login', verLogin);
app.post('/usuario/login', procesarLogin);
app.get('/usuario/logout', cerrarSesion);

// ── Dashboards ───────────────────────
app.get('/dashboard/admin', (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'admin') return res.redirect('/login');
    res.render('usuario/dashboards/admin');
});

app.get('/dashboard/tecnico', (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'tecnico') return res.redirect('/login');
    res.render('usuario/dashboards/tecnico');
});

app.get('/dashboard/cliente', (req, res) => {
    if (!req.session.user || req.session.user.rol !== 'cliente') return res.redirect('/login');
    res.render('usuario/dashboards/cliente');
});

// ── Perfiles ─────────────────────────
app.get('/usuario/perfil/cliente', (req, res) => {
    res.render('usuario/perfil/perfil_cliente');
});

app.get('/usuario/perfil/tecnico', (req, res) => {
    res.render('usuario/perfil/perfil_tecnico');
});

app.get('/usuario/perfil/admin', (req, res) => {
    res.render('usuario/perfil/perfil_admin');
});

// ── Server ───────────────────────────
app.listen(port, () => {
    console.log(`Server running 🚀 at http://localhost:${port}`);
});