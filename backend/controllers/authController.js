
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, address, phone, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, address, phone, email, password: hash });
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao cadastrar usuário.', details: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Email ou senha inválidos' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Email ou senha inválidos' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    res.status(500).json({ error: 'Erro no login', details: err });
  }
};

exports.recover = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'E-mail não encontrado' });

    // Simulação do envio de e-mail
    res.json({ message: 'Instruções para redefinir a senha foram enviadas para o e-mail.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro na recuperação de senha', details: err });
  }
};
