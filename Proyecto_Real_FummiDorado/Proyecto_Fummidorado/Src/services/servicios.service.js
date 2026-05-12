// Datos simulados — reemplazar por queries a BD cuando esté lista
const serviciosMock = [
  {
    id: '001',
    fecha: '4/4/2026',
    hora: '9:00 AM',
    cliente: 'Hotel Metropolitano',
    sede: 'Principal',
    direccion: 'Avenida Principal 123, Chapinero',
    tecnico: 'Carlos Rodriguez',
    tipo: 'Fumigacion Integral',
    estado: 'Completado',
    lat: 4.6690,
    lng: -74.0600
  },
  {
    id: '002',
    fecha: '4/4/2026',
    hora: '11:00 AM',
    cliente: 'Restaurante el buen sabor',
    sede: 'Kennedy',
    direccion: 'Cra 7 #34-92 sur, Calera',
    tecnico: 'Mario Gonzalez',
    tipo: 'Control de roedores',
    estado: 'Completado',
    lat: 4.6400,
    lng: -74.1540
  },
  {
    id: '003',
    fecha: '4/4/2026',
    hora: '8:00 AM',
    cliente: 'Almacen Central',
    sede: 'Principal',
    direccion: 'Industrial Park, Fontibon',
    tecnico: 'Carlos Rodriguez',
    tipo: 'Desinfección',
    estado: 'Pendiente',
    lat: 4.6980,
    lng: -74.1500
  },
  {
    id: '004',
    fecha: '4/4/2026',
    hora: '7:00 PM',
    cliente: 'Oficinas Tech Corp',
    sede: 'Las Flores',
    direccion: 'Residencias, Las Flores',
    tecnico: 'Mario Gonzalez',
    tipo: 'Fumigacion Preventiva',
    estado: 'Pendiente',
    lat: 4.6500,
    lng: -74.0800
  }
];

// Obtener todos los servicios
const obtenerTodos = () => serviciosMock;

// Obtener servicios de hoy (por ahora devuelve todos los mock)
const obtenerServiciosHoy = () => serviciosMock;

// Obtener un servicio por ID
const obtenerPorId = (id) => serviciosMock.find(s => s.id === id) || null;

// Estadísticas del día
const obtenerEstadisticas = () => {
  const total      = serviciosMock.length;
  const completados = serviciosMock.filter(s => s.estado === 'Completado').length;
  const pendientes  = serviciosMock.filter(s => s.estado === 'Pendiente').length;
  return { total, completados, pendientes };
};

export default { obtenerTodos, obtenerServiciosHoy, obtenerPorId, obtenerEstadisticas };