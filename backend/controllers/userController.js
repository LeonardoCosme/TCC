const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Certifique-se de que models/index.js exporta User corretamente
require('dotenv').config();

// ✅ REGISTRO (Cadastro de novo usuário)
exports.register = async (req, res) => {
  const { name, address, phone, email, password } = req.body;

  if (!name || !address || !phone || !email || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    await User.create({ name, address, phone, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário. Verifique os dados.' });
  }
};

// ✅ LOGIN (Autenticação de usuário)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca usuário pelo e-mail
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
    }

    // Gera token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno ao fazer login.' });
  }
};

// ✅ PERFIL DO USUÁRIO (Dados protegidos por token)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'address', 'phone', 'email']
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil do usuário.' });
  }
};
