const express = require('express');
const router = express.Router();
const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Middleware para verificar token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

// Rota para retornar dados do usuário logado
router.get('/api/user/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['name', 'address', 'phone', 'email']
    });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

module.exports = router;
