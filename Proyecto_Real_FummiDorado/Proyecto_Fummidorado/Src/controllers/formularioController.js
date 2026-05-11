export const verFormulario = (req, res) => {

  const orden = {

    codigoOs: 'OS-001',

    fechaProgramada: '2026-05-11',

    horaInicio: '09:00',

    horaFin: '11:00',

    estado: 'Por ejecutar',

    observaciones: 'Servicio rutinario mensual',

    nombreSede: 'Sede Principal',

    direccionSede: 'Calle 72 #10-34, Bogotá',

    nombreCliente: 'Hotel Metropol',

    nombreTipoServicio: 'Fumigación Integral',

    nombreTecnico: 'Carlos Rodriguez'

  };

  res.render('formulario/index', {
    orden
  });

};