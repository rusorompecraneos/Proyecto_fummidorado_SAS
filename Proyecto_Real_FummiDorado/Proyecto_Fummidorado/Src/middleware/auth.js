// middleware/auth.js
// Uso: import { requireAuth, requireRole } from '../middleware/auth.js';
 
// Verifica que el usuario esté logueado
export function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }
  next();
}
 
// Verifica que el usuario tenga uno de los roles permitidos
// Ejemplo: requireRole('admin') o requireRole('admin', 'tecnico')
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/login');
    }
    if (!roles.includes(req.session.user.rol)) {
      return res.status(403).render('error', {
        mensaje: 'No tienes permiso para acceder a esta sección.'
      });
    }
    next();
  };
}