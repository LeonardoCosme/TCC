const express = require('express');
const router = express.Router();

// 📦 Controllers
const emailController = require('../controllers/emailController');
const passwordResetController = require('../controllers/passwordResetController');
const userController = require('../controllers/userController');
const prestadorController = require('../controllers/prestadorController');
const servicoController = require('../controllers/servicoController');

// 🔐 Middleware
const authenticate = require('../middleware/authenticate');

// ==================== 🧾 ROTAS DE USUÁRIO ====================
router.post('/register', ...userController.validateRegister, userController.register);
router.post('/login', ...userController.validateLogin, userController.login);
router.get('/user/me', authenticate, userController.getProfile);

// ==================== 🔄 ROTAS DE SENHA ====================
router.post('/forgot-password', ...emailController.validateForgotPassword, emailController.forgotPassword);
router.post('/reset-password', ...passwordResetController.validateResetPassword, passwordResetController.resetPassword);

// ==================== ✅ ROTAS DE PRESTADOR ====================
router.post(
  '/prestador',
  authenticate,
  ...prestadorController.validatePrestador,
  prestadorController.savePrestador
);
router.get('/prestador/me', authenticate, prestadorController.getMe);

// ==================== ✅ ROTAS DE SERVIÇOS ====================
router.post(
  '/servicos',
  authenticate,
  ...servicoController.validateServico,
  servicoController.createServico
);
router.get('/servicos', authenticate, servicoController.getServicos);

// 🚪 Exporta as rotas agrupadas em '/api' no server.js
module.exports = router;
