// export const login = (req, res) => {
//     const { usuario, password, rol } = req.body;

//     // Validación básica
//     if (!usuario || !password || !rol) {
//         return res.redirect('/login');
//     }

//     // 🔥 GUARDAR USUARIO EN SESIÓN
//     req.session.user = {
//         nombre: usuario,
//         rol: rol,
//         email: usuario + "@correo.com",
//         telefono: "3000000000"
//     };

//     // 🔥 REDIRECCIÓN POR ROL
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