import express from 'express';
import { join, resolve } from "path";
import passwordRoutes from './routes/password.routes.js';
import appRouter from "./routes/router.js";
import clienteRoutes from './routes/cliente.routes.js';
import tecnicoRoutes from './routes/tecnico.routes.js';
import adminRoutes from './routes/admin.routes.js';




const app = express();
const port = 3000;
app.set("view engine", 'ejs');
app.set("views", "views")
app.use(express.static(join("./public")))
app.use(express.urlencoded({ extended: true }));

// Gestion de servicios, admin. 
app.use('/admin', adminRoutes);

// Diagramas UPC y Hds-ft
app.use('/documentosTecnicoCliente', clienteRoutes);
app.use('/documentosTecnicoCliente', tecnicoRoutes);

app.use('/password', passwordRoutes);

app.use("/", appRouter);


app.get('/login', (req, res) => {
  res.render('usuario/login');
});

app.get('/dashboard/tecnico', (req, res) => {
  res.render('usuario/dashboards/tecnico');
});

app.get('/dashboard/admin', (req, res) => {
  res.render('usuario/dashboards/admin');
});

app.get('/dashboard/cliente', (req, res) => {
  res.render('usuario/dashboards/cliente');
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
// Comentario