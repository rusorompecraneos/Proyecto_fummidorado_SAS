import express from 'express';
import path from 'path';
import { join } from "path";
import { fileURLToPath } from 'url';

import passwordRoutes from './routes/password.routes.js';
import appRouter from "./routes/router.js";
import clienteRoutes from './routes/cliente.routes.js';
import tecnicoRoutes from './routes/tecnico.routes.js';
import adminRoutes from './routes/admin.routes.js';

// 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Cambiado para el despliegue
//app.set("view engine", 'ejs');
// app.set("views", "views")
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Gestion de servicios, admin. 
app.use('/admin', adminRoutes);

// Diagramas UPC y Hds-ft
app.use('/documentosTecnicoCliente', clienteRoutes);
app.use('/Usuario/cliente', clienteRoutes);
app.use('/documentosTecnicoCliente', tecnicoRoutes);

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


app.listen(port, () => {
  console.log(`Server running 🚀 at http://localhost:${port}`);
});
