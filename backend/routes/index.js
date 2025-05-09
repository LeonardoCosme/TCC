const express = require('express');
const router = express.Router();

// 📦 Controllers
const emailController = require('../controllers/emailController');
const passwordResetController = require('../controllers/passwordResetController');
const userController = require('../controllers/userController');
const prestadorController = require('../controllers/prestadorController');

// 🔐 Middleware
const authenticate = require('../middleware/authenticate');

// ==================== 🧾 ROTAS DE USUÁRIO ====================
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/me', authenticate, userController.getProfile);

// ==================== 🔄 ROTAS DE SENHA ====================
router.post('/forgot-password', emailController.forgotPassword);
router.post('/reset-password', passwordResetController.resetPassword);

// ==================== ✅ ROTAS DE PRESTADOR ====================
router.post('/prestador', authenticate, prestadorController.savePrestador);
router.get('/prestador/me', authenticate, prestadorController.getMe);

// 🚪 Exporta as rotas agrupadas em '/api' no server.js
module.exports = router;
