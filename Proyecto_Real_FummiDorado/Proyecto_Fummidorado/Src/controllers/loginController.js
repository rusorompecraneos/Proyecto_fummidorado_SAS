// export const login = (req, res) => {
//     const { usuario, password, rol } = req.body;

//     // Validación básica (puedes conectar a BD después)
//     if (!usuario || !password || !rol) {
//         return res.redirect('/login');
//     }

//     // 🔥 AQUÍ GUARDAS TODO EN SESIÓN
//     req.session.usuario = {
//         nombre: usuario,
//         rol: rol,
//         email: usuario + "@correo.com",
//         telefono: "3000000000"
//     };

//     // Redirección por rol
//     if (rol === 'admin') {
//         return res.redirect('/dashboard/admin');
//     }

//     if (rol === 'tecnico') {
//         return res.redirect('/dashboard/tecnico');
//     }

//     if (rol === 'cliente') {
//         return res.redirect('/dashboard/cliente');
//     }

//     res.redirect('/login');
// };