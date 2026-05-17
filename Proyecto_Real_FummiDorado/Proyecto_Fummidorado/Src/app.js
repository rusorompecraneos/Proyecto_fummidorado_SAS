import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import session from 'express-session';
import dotenv from 'dotenv';
import { conectarDB } from './config/db.js';

// Importar rutas
import passwordRoutes from './routes/password.routes.js';
import appRouter from "./routes/router.js";
import clienteRoutes from './routes/cliente.routes.js';
import tecnicoRoutes from './routes/tecnico.routes.js';
import adminRoutes from './routes/admin.routes.js';

// Importar modelos para que Sequelize los registre
import './models/index.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;



 
// Cambiado para el despliegue
// app.set("view engine", 'ejs');
// app.set("views", "views")
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


// codigo de verifiacion
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000 } // 10 minutos
}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));


// Gestion de servicios, admin. 
app.use('/admin', adminRoutes);

// Diagramas UPC y Hds-ft
app.use('/documentosTecnicoCliente', clienteRoutes);
app.use('/Usuario/cliente', clienteRoutes);
app.use('/documentosTecnicoCliente', tecnicoRoutes);

// Mapa del tecnico
app.use('/mapa-tecnico', tecnicoRoutes);


app.use('/password', passwordRoutes);



app.use("/", appRouter);


app.get('/login', (req, res) => {
  res.render('Usuario/login');
});

app.get('/dashboard/tecnico', (req, res) => {
  res.render('Usuario/dashboards/tecnico');
});

app.get('/dashboard/admin', (req, res) => {
  res.render('Usuario/dashboards/admin');
});

app.get('/dashboard/cliente', (req, res) => {
  res.render('Usuario/dashboards/cliente');
});

app.get('/usuario/logout', (req, res) => {
  res.redirect('/login');
});

app.get('/usuario/perfil/cliente', (req, res) => {
    res.render('usuario/perfil/perfil_cliente');
});

app.get('/usuario/perfil/tecnico', (req, res) => {
    res.render('usuario/perfil/perfil_tecnico');
});

app.get('/usuario/perfil/admin', (req, res) => {
  res.render('usuario/perfil/perfil_admin');
});





app.post('/usuario/login', (req, res) => {
  const { role } = req.body;

  if (!role) return res.redirect('/login');

  if (role === 'admin') {
    return res.redirect('/dashboard/admin');
  }

  if (role === 'tecnico') {
    return res.redirect('/dashboard/tecnico');
  }

  if (role === 'cliente') {
    return res.redirect('/dashboard/cliente');
  }

  res.redirect('/login');
});

// Arrancar servidor DESPUÉS de conectar la BD
const PORT = process.env.PORT || 3000;

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running 🚀 at http://localhost:${PORT}`);
  });
});