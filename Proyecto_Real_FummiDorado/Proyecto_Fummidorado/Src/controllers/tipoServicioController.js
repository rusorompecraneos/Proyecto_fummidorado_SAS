// Datos locales (simulando la base de datos)
const tiposServicio = [
    { idTipoServicio: 1, nombre: 'Fumigación Integral', descripcion: 'Control completo de insectos', estado: 'Activo' },
    { idTipoServicio: 2, nombre: 'Control de Roedores', descripcion: 'Control y eliminación de roedores', estado: 'Activo' },
    { idTipoServicio: 3, nombre: 'Desinfección', descripcion: 'Sanitización de espacios', estado: 'Activo' },
];

// Mostrar lista de tipos de servicio
export const listarTiposServicio = (req, res) => {
    res.render('tipoServicio/index', { tiposServicio });
};