// Datos locales
const ordenes = [
    {
        idOrden: 1,
        codigoOs: 'OS-001',
        fechaProgramada: '2026-04-04',
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
        fechaProgramada: '2026-04-04',
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

// Listar órdenes
export const listarOrdenes = (req, res) => {
    res.render('ordenServicio/index', { ordenes });
};

// Ver detalle de una orden
export const verOrden = (req, res) => {
    const orden = ordenes.find(o => o.idOrden === parseInt(req.params.id));
    if (!orden) return res.redirect('/ordenServicio');
    res.render('ordenServicio/detalle', { orden });
};