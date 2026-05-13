// Este archivo recibe los datos desde el EJS a través de variables globales
// que se definen en el EJS antes de cargar este script

document.addEventListener('DOMContentLoaded', function () {

  // Inicializar mapa centrado en Bogotá
  const mapa = L.map('mapa').setView([4.6511, -74.0553], 12);

  // Capa OpenStreetMap — gratuita, sin API key
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(mapa);

  // Íconos personalizados
  const iconoPendiente = L.divIcon({
    className: '',
    html: '<div style="background:#e6a817;width:14px;height:14px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  const iconoCompletado = L.divIcon({
    className: '',
    html: '<div style="background:#3dba7a;width:14px;height:14px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });

  const iconoUbicacion = L.divIcon({
    className: '',
    html: '<div style="background:#4fa3e0;width:16px;height:16px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 4px rgba(79,163,224,0.3);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  // window.serviciosData viene definido en el EJS
  window.serviciosData.forEach(function (s) {
    const icono = s.estado === 'Completado' ? iconoCompletado : iconoPendiente;
    L.marker([s.lat, s.lng], { icon: icono })
      .addTo(mapa)
      .bindPopup(
        '<div style="font-family:sans-serif;min-width:160px;">' +
        '<strong style="font-size:14px;">' + s.cliente + '</strong><br>' +
        '<span style="color:#888;font-size:12px;">' + s.direccion + '</span><br>' +
        '<span style="font-size:12px;">🕐 ' + s.hora + '</span><br>' +
        '<span style="display:inline-block;margin-top:4px;padding:2px 8px;border-radius:10px;font-size:11px;' +
        'background:' + (s.estado === 'Completado' ? '#3dba7a22' : '#e6a81722') + ';' +
        'color:' + (s.estado === 'Completado' ? '#3dba7a' : '#e6a817') + ';">' +
        s.estado + '</span></div>'
      );
  });

  // Ubicación real del técnico
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      function (pos) {
        if (window.marcadorTecnico) {
          mapa.removeLayer(window.marcadorTecnico);
        }
        window.marcadorTecnico = L.marker(
          [pos.coords.latitude, pos.coords.longitude],
          { icon: iconoUbicacion }
        ).addTo(mapa).bindPopup('<strong>Tu ubicación actual</strong>');
      },
      function (error) {
        console.log('Geolocalización no disponible:', error.message);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  }

  // Función global para centrar el mapa desde la lista
  window.centrarEn = function (lat, lng) {
    mapa.flyTo([lat, lng], 15, { duration: 1 });
    mapa.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        const pos = layer.getLatLng();
        if (Math.abs(pos.lat - lat) < 0.0001 && Math.abs(pos.lng - lng) < 0.0001) {
          layer.openPopup();
        }
      }
    });
  };

});