// Datos locales
const formularios = [
    {
        idFormulario: 1,
        idOrden: 1,
        codigoOs: 'OS-001',
        nombreCliente: 'Hotel Metropol',
        nombreSede: 'Sede Principal',
        direccionSede: 'Calle 72 #10-34, Bogotá',
        nombreTecnico: 'Carlos Rodriguez',
        fechaServicio: '2026-04-04',
        frecuencia: 'Mensual',
        horaLlegada: '08:45',
        horaInicio: '09:00',
        horaTerminacion: '11:00',
        // Diagnóstico e inspección
        techo: 'Adecuado',
        paredes: 'Adecuado',
        pisos: 'No adecuado',
        ventanas: 'Adecuado',
        puertas: 'Adecuado',
        iluminacion: 'Adecuado',
        ventilacion: 'No adecuado',
        drenajes: 'Adecuado',
        // Control de áreas
        areasControl: ['Cocina', 'Habitaciones', 'Área común', 'Almacén'],
        // Tipos y métodos
        tiposControl: ['Desinsectación', 'Desinfección / Sanitización'],
        metodosControl: ['Aspersión', 'Nebulización'],
        // Inspección
        plagasEncontradas: ['Cucarachas', 'Moscas'],
        // Condiciones
        higieneLugar: 'Bueno',
        instalaciones: 'Regular',
        estructura: 'Bueno',
        // Observaciones y estado
        observacionesGenerales: 'Se realizó tratamiento completo en todas las áreas indicadas.',
        evidenciasFotograficas: [],
        firmaCliente: true,
        firmaTecnico: true,
        estado: 'Finalizado'
    }
];

// Listar formularios
export const listarFormularios = (req, res) => {
    res.render('formulario/index', { formularios });
};

// Ver detalle de un formulario
export const verFormulario = (req, res) => {
    const formulario = formularios.find(f => f.idFormulario === parseInt(req.params.id));
    if (!formulario) return res.redirect('/formulario');
    res.render('formulario/detalle', { formulario });
};

// Mostrar formulario para editar
export const editarFormulario = (req, res) => {
    const formulario = formularios.find(f => f.idFormulario === parseInt(req.params.id));
    if (!formulario) return res.redirect('/formulario');
    res.render('formulario/editar', { formulario });
};

// Guardar cambios del formulario
export const guardarFormulario = (req, res) => {
    const index = formularios.findIndex(f => f.idFormulario === parseInt(req.params.id));
    if (index !== -1) {
        formularios[index] = { ...formularios[index], ...req.body };
    }
    res.redirect(`/formulario/${req.params.id}`);
};