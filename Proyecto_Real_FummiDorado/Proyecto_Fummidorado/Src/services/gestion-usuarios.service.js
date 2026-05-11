let usuariosMock = [
  {
    id: 1,
    nombre: 'Carlos Rodriguez',
    correo: 'carlos@fumidorado.com',
    usuario: 'carlos.r',
    password: 'tech2024',
    rol: 'tecnico'
  },
  {
    id: 2,
    nombre: 'Mario Gonzalez',
    correo: 'mario@fumidorado.com',
    usuario: 'mario.g',
    password: 'tech2024',
    rol: 'tecnico'
  },
  {
    id: 3,
    nombre: 'Hotel Metropol',
    correo: 'contacto@hmetropol.com',
    usuario: 'hotel.metro',
    password: 'cliente2024',
    rol: 'cliente'
  }
];

let nextId = 4;

const obtenerTodos  = () => usuariosMock;
const obtenerPorId  = (id) => usuariosMock.find(u => u.id === parseInt(id)) || null;

const crear = (datos) => {
  const nuevo = { id: nextId++, ...datos };
  usuariosMock.push(nuevo);
  return nuevo;
};

const actualizar = (id, datos) => {
  const idx = usuariosMock.findIndex(u => u.id === parseInt(id));
  if (idx === -1) return null;
  usuariosMock[idx] = { ...usuariosMock[idx], ...datos };
  return usuariosMock[idx];
};

const eliminar = (id) => {
  const idx = usuariosMock.findIndex(u => u.id === parseInt(id));
  if (idx === -1) return false;
  usuariosMock.splice(idx, 1);
  return true;
};

const existeUsuario = (usuario, excludeId = null) => {
  return usuariosMock.some(u => u.usuario === usuario && u.id !== parseInt(excludeId));
};

const existeCorreo = (correo, excludeId = null) => {
  return usuariosMock.some(u => u.correo === correo && u.id !== parseInt(excludeId));
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar, existeUsuario, existeCorreo };