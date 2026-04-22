// Datos locales (simulando la base de datos)
const productos = [
    {
        idProducto: 1,
        nombre: 'K-Othrine SC 62.5',
        ingredienteActivo: 'Deltametrina',
        concentracion: '6.25%',
        tipoProducto: 'Insecticida',
        descripcion: 'Insecticida de amplio espectro para control de insectos rastreros y voladores.',
        categoriaToxicologica: 'Categoría II',
        mesesUso: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        estado: 'Activo'
    },
    {
        idProducto: 2,
        nombre: 'Klerat',
        ingredienteActivo: 'Brodifacoum',
        concentracion: '0.005%',
        tipoProducto: 'Rodenticida',
        descripcion: 'Rodenticida anticoagulante de alta eficacia.',
        categoriaToxicologica: 'Categoría I',
        mesesUso: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        estado: 'Activo'
    },
    {
        idProducto: 3,
        nombre: 'Storm',
        ingredienteActivo: 'Flocoumafen',
        concentracion: '0.005%',
        tipoProducto: 'Rodenticida',
        descripcion: 'Rodenticida en bloques parafinados, resistente a la humedad.',
        categoriaToxicologica: 'Categoría I',
        mesesUso: ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        estado: 'Activo'
    }
];

// Mostrar lista de productos
export const listarProductos = (req, res) => {
    res.render('producto/index', { productos });
};