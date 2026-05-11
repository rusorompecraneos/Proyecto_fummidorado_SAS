export const listarReportes = (req, res) => {

  const reportes = [

    {
      idFormulario: 1,
      codigoOs: "OS-001",
      nombreCliente: "Hotel Metropol",
      nombreTecnico: "Carlos Rodriguez",
      tipoDocumento: "Reporte de Servicio",
      fecha: "2026-05-08",
      hora: "09:00",
      evidencias: [],

      areas: ["Cocina", "Bodega"],
      plagas: ["Roedores"],
      observaciones: "Servicio realizado correctamente"
    },

    {
      idFormulario: 2,
      codigoOs: "OS-002",
      nombreCliente: "El Buen Sabor",
      nombreTecnico: "Mario Gonzalez",
      tipoDocumento: "Reporte de Servicio",
      fecha: "2026-05-09",
      hora: "14:00",
      evidencias: [],

      areas: ["Comedor"],
      plagas: ["Cucarachas"],
      observaciones: "Se recomienda seguimiento"
    }

  ];

  res.render("reportes/index", {
    formularios: reportes
  });

};