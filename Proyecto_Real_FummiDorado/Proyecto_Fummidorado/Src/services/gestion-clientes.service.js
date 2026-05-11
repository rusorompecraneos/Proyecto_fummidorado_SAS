// Datos mock — reemplazar por queries a BD cuando esté lista
let clientesMock = [
  {
    id: 1,
    nombre: 'Hotel Metropol',
    nit: '900123456-7',
    contacto: 'Pedro Gonzalez',
    telefono: '3001234567',
    correo: 'contacto@hotelmetropol.com',
    direccion: 'Calle 72 #10-34, Bogotá',
    sede: 'Sede Principal',
    sedes: 2
  },
  {
    id: 2,
    nombre: 'El buen sabor',
    nit: '800234567-8',
    contacto: 'Maria Ramirez',
    telefono: '3109876543',
    correo: 'contacto@elbuensabor.com',
    direccion: 'Carrera 15 #85-40, Bogotá',
    sede: 'Kennedy',
    sedes: 1
  }
];

let nextId = 3;

const obtenerTodos = () => clientesMock;

const obtenerPorId = (id) => clientesMock.find(c => c.id === parseInt(id)) || null;

const crear = (datos) => {
  const nuevo = { id: nextId++, sedes: 1, ...datos };
  clientesMock.push(nuevo);
  return nuevo;
};

const actualizar = (id, datos) => {
  const idx = clientesMock.findIndex(c => c.id === parseInt(id));
  if (idx === -1) return null;
  clientesMock[idx] = { ...clientesMock[idx], ...datos };
  return clientesMock[idx];
};

const eliminar = (id) => {
  const idx = clientesMock.findIndex(c => c.id === parseInt(id));
  if (idx === -1) return false;
  clientesMock.splice(idx, 1);
  return true;
};

export default { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };