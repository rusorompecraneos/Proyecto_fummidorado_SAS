// Datos locales
const ordenes = [
    {
        idOrden: 1,
        codigoOs: 'OS-001',
        fechaProgramada: '2026-05-11',
        horaInicio: '09:00',
        horaFin: '11:00',
        estado: 'Por ejecutar',
        observaciones: 'Servicio rutinario mensual',
        firmaCliente: false,
        nombreSede: 'Sede Principal',
        direccionSede: 'Calle 72 #10-34, Bogotá',
        idCliente: 1,
        nombreCliente: 'Hotel Metropol',
        idTipoServicio: 1,
        nombreTipoServicio: 'Fumigación Integral',
        idUsuario: 1,
        nombreTecnico: 'Carlos Rodriguez'
    },
    {
        idOrden: 2,
        codigoOs: 'OS-002',
        fechaProgramada: '2026-05-11',
        horaInicio: '14:00',
        horaFin: '16:00',
        estado: 'Finalizado',
        observaciones: '',
        firmaCliente: true,
        nombreSede: 'Kennedy',
        direccionSede: 'Carrera 15 #85-40, Bogotá',
        idCliente: 2,
        nombreCliente: 'El buen sabor',
        idTipoServicio: 2,
        nombreTipoServicio: 'Control de Roedores',
        idUsuario: 2,
        nombreTecnico: 'Mario Gonzalez'
    },
    {
        idOrden: 3,
        codigoOs: 'OS-003',
        fechaProgramada: '2026-04-05',
        horaInicio: '08:00',
        horaFin: '10:00',
        estado: 'En proceso',
        observaciones: 'Cliente solicita atención urgente',
        firmaCliente: false,
        nombreSede: 'Norte',
        direccionSede: 'Calle 140 #15-20, Bogotá',
        idCliente: 1,
        nombreCliente: 'Hotel Metropol',
        idTipoServicio: 3,
        nombreTipoServicio: 'Desinfección',
        idUsuario: 1,
        nombreTecnico: 'Carlos Rodriguez'
    }
];

// =================================================
// LISTAR ÓRDENES
// =================================================

export const listarOrdenes = (req, res) => {

  const user = req.session.user;

  let ordenesFiltradas = ordenes;

  // 🔥 MODO DE VISTA
  const modoVista = req.query.vista || 'default';

  // =================================================
  // CLIENTE - SERVICIOS COMPLETADOS
  // =================================================

  if (modoVista === 'cliente-completados') {

    ordenesFiltradas = ordenes.filter(
      o => o.estado === 'Finalizado'
    );

  }

  // =================================================
  // CLIENTE - PROGRAMACIÓN
  // =================================================

  if (modoVista === 'cliente-programacion') {

    ordenesFiltradas = ordenes.filter(
      o => o.estado !== 'Finalizado'
    );

  }

  // =================================================
  // FILTROS
  // =================================================

  const { buscar, fecha, hora, estado } = req.query;

  // 🔎 BUSCADOR
  if (buscar) {

    ordenesFiltradas = ordenesFiltradas.filter(o =>

      o.codigoOs.toLowerCase().includes(buscar.toLowerCase()) ||

      o.nombreCliente.toLowerCase().includes(buscar.toLowerCase()) ||

      o.nombreSede.toLowerCase().includes(buscar.toLowerCase())

    );

  }

  // 📅 FECHA
  if (fecha) {

    ordenesFiltradas = ordenesFiltradas.filter(
      o => o.fechaProgramada === fecha
    );

  }

  // 🕐 HORA
  if (hora) {

    ordenesFiltradas = ordenesFiltradas.filter(
      o => o.horaInicio === hora
    );

  }

  // 📌 ESTADO
  if (estado) {

    ordenesFiltradas = ordenesFiltradas.filter(
      o => o.estado === estado
    );

  }

  // =================================================
  // RENDER
  // =================================================

  res.render('ordenServicio/index', {
    ordenes: ordenesFiltradas,
    user,
    filtros: req.query,
    modoVista
  });

};

// =================================================
// CREAR ORDEN
// =================================================

export const crearOrden = (req, res) => {

  const nuevaOrden = {
    idOrden: ordenes.length + 1,
    codigoOs: `OS-00${ordenes.length + 1}`,
    fechaProgramada: req.body.fechaProgramada,
    horaInicio: req.body.horaInicio,
    estado: 'Por ejecutar',
    nombreCliente: req.body.nombreCliente,
    nombreSede: req.body.nombreSede,
    nombreTecnico: req.body.nombreTecnico,
    nombreTipoServicio: req.body.nombreTipoServicio,
    observaciones: req.body.observaciones || '',
    firmaCliente: req.body.firmaCliente ? true : false
  };

  ordenes.push(nuevaOrden);

  res.redirect('/ordenServicio?creado=true');
};

// =================================================
// VER DETALLE
// =================================================

export const verOrden = (req, res) => {

  const orden = ordenes.find(
    o => o.idOrden == req.params.id
  );

  res.render('ordenServicio/detalle', { orden });

};

// =================================================
// MOSTRAR EDITAR
// =================================================

export const mostrarEditar = (req, res) => {

  const orden = ordenes.find(
    o => o.idOrden == req.params.id
  );

  res.render('ordenServicio/editar', { orden });

};

// =================================================
// EDITAR ORDEN
// =================================================

export const editarOrden = (req, res) => {

  const { id } = req.params;

  const orden = ordenes.find(
    o => o.idOrden == id
  );

  if (!orden) {
    return res.redirect('/ordenServicio');
  }

  try {

    orden.fechaProgramada = req.body.fechaProgramada;
    orden.horaInicio = req.body.horaInicio;
    orden.nombreCliente = req.body.nombreCliente;
    orden.nombreSede = req.body.nombreSede;
    orden.nombreTecnico = req.body.nombreTecnico;
    orden.nombreTipoServicio = req.body.nombreTipoServicio;
    orden.observaciones = req.body.observaciones;

    res.redirect('/ordenServicio?editado=true');

  } catch (error) {

    res.redirect('/ordenServicio');

  }

};

// =================================================
// RESUMEN SERVICIOS TÉCNICO
// =================================================

export const resumenServicios = (req, res) => {

  // 🔥 FECHA ACTUAL
  const hoy = new Date();

  const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

  // 🔥 SERVICIOS DEL DÍA
  const serviciosHoy = ordenes.filter(
    orden => orden.fechaProgramada === fechaHoy
  );

  // 🔥 TOTAL
  const totalServicios = serviciosHoy.length;

  // 🔥 COMPLETADOS
  const completados = serviciosHoy.filter(
    s => s.estado === 'Finalizado'
  ).length;

  // 🔥 PENDIENTES
  const pendientes = serviciosHoy.filter(
    s => s.estado !== 'Finalizado'
  ).length;

  // 🔥 RENDER
  res.render('tecnico/resumen', {
    serviciosHoy,
    totalServicios,
    completados,
    pendientes
  });

};
