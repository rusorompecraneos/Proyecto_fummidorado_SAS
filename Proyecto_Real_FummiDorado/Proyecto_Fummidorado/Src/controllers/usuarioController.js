// Src/controllers/usuarioController.js

// Muestra la vista del login
export function verLogin(req, res) {
    if (req.session.user) return res.redirect(`/dashboard/${req.session.user.rol}`);
    res.render('Usuario/login');
}

// Procesa el formulario de login
export function procesarLogin(req, res) {
    const { username, password, role } = req.body;

    // Por ahora valida solo el rol (cuando tengas BD reemplaza esto)
    if (!role) return res.render('Usuario/login', { error: 'Selecciona un tipo de usuario.' });

    // ⚠️ Aquí va la validación real contra la BD cuando la tengas
    // Por ahora guarda el rol en sesión directamente
    req.session.user = {
        rol: role,
        nombre: role === 'admin' ? 'Administrador' : role === 'tecnico' ? 'Técnico' : 'Cliente'
    };

    return res.redirect(`/dashboard/${role}`);
}

// Cierra la sesión
export function cerrarSesion(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}
