const mostrarRecuperar = (req, res) => res.render('Usuario/password/recuperar-password', { error: null });
const irAVerificar     = (req, res) => res.redirect('/password/verificar');

const mostrarVerificar = (req, res) => res.render('Usuario/password/verificar-codigo', { error: null });
const irANuevaPassword = (req, res) => res.redirect('/password/nueva-password');

const mostrarNuevaPassword = (req, res) => res.render('Usuario/password/nueva-password', { error: null });
const irALogin             = (req, res) => res.redirect('/password/confirmacion');

const mostrarConfirmacion = (req, res) => res.render('Usuario/password/password-actualizado');

export default {
  mostrarRecuperar,
  irAVerificar,
  mostrarVerificar,
  irANuevaPassword,
  mostrarNuevaPassword,
  irALogin,
  mostrarConfirmacion
};