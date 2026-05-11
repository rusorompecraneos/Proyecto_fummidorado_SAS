// ================= DATOS SIMULADOS =================
const productos = [
  {
    idProducto: 1,
    nombre: 'K-Othrine SC 62.5',
    ingredienteActivo: 'Deltametrina',
    concentracion: '6.25%',
    tipoProducto: 'Insecticida',
    descripcion: 'Insecticida de amplio espectro para control de insectos.',
    mesesUso: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    estado: 'Activo'
  },
  {
    idProducto: 2,
    nombre: 'Klerat',
    ingredienteActivo: 'Brodifacoum',
    concentracion: '0.005%',
    tipoProducto: 'Rodenticida',
    descripcion: 'Rodenticida anticoagulante de alta eficacia.',
    mesesUso: ['Ene','Feb','Mar','Abr','May','Jun'],
    estado: 'Activo'
  }
];

// ================= FUNCIÓN AUXILIAR =================
const procesarMeses = (meses) => {
  if (!meses || meses.trim() === "") return [];

  return meses
    .split(",")
    .map(m => m.trim())
    .filter(m => m !== "");
};

// ================= LISTAR =================
export const listarProductos = (req, res) => {
  res.render('producto/index', { productos });
};

// ================= CREAR =================
export const crearProducto = (req, res) => {
  try {
    const nuevoProducto = {
      idProducto: productos.length > 0
        ? Math.max(...productos.map(p => p.idProducto)) + 1
        : 1,

      nombre: req.body.nombre,
      descripcion: req.body.descripcion || "",
      ingredienteActivo: req.body.ingredienteActivo,
      concentracion: req.body.concentracion,
      tipoProducto: req.body.tipoProducto,
      mesesUso: procesarMeses(req.body.mesesUso),
      estado: 'Activo'
    };

    productos.push(nuevoProducto);

    res.redirect('/producto?creado=true');

  } catch {
    res.redirect('/producto');
  }
};

// ================= EDITAR =================
export const editarProducto = (req, res) => {
  const { id } = req.params;

  const producto = productos.find(p => p.idProducto == id);

  if (!producto) {
    return res.redirect('/producto');
  }

  try {
    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion || "";
    producto.ingredienteActivo = req.body.ingredienteActivo;
    producto.concentracion = req.body.concentracion;
    producto.tipoProducto = req.body.tipoProducto;
    producto.mesesUso = procesarMeses(req.body.mesesUso);

    res.redirect('/producto?editado=true');

  } catch {
    res.redirect('/producto');
  }
};

// ================= ELIMINAR =================
export const eliminarProducto = (req, res) => {
  const { id } = req.params;

  const index = productos.findIndex(p => p.idProducto == id);

  if (index === -1) {
    return res.redirect('/producto');
  }

  productos.splice(index, 1);

  res.redirect('/producto?eliminado=true');
};