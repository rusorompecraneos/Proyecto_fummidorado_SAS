// Servicios con coordenadas reales de Bogotá
// Cuando llegue la BD, estas coordenadas vendrán de la tabla de sedes
const serviciosMock = [
  {
    id: 1,
    cliente: 'Hotel Metropolitano',
    hora: '9:00 AM',
    estado: 'Pendiente',
    direccion: 'Calle 72 #10-34, Chapinero',
    lat: 4.6590,
    lng: -74.0554
  },
  {
    id: 2,
    cliente: 'Cafam Floresta',
    hora: '8:00 AM',
    estado: 'Pendiente',
    direccion: 'Av. 68 #90-88, Barrios Unidos',
    lat: 4.6820,
    lng: -74.0831
  },
  {
    id: 3,
    cliente: 'Universidad del Bosque',
    hora: '6:00 PM',
    estado: 'Completado',
    direccion: 'Av. Cra 9 #131A-02, Usaquén',
    lat: 4.7030,
    lng: -74.0488
  },
  {
    id: 4,
    cliente: 'Hospital San Carlos',
    hora: '3:00 PM',
    estado: 'Pendiente',
    direccion: 'Calle 10 #10-86, Santa Fe',
    lat: 4.5981,
    lng: -74.0810
  }
];

const obtenerServiciosSemana = () => serviciosMock;

export default { obtenerServiciosSemana };