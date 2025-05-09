const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email obrigatório' });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Redefinição de Senha',
      html: `<p>Clique no link abaixo para redefinir sua senha:</p>
             <a href="http://localhost:3000/resetar-senha?token=${token}">
               Redefinir senha
             </a>`,
    });

    console.log('✅ Email enviado:', info.messageId);
    console.log('🔗 Link para visualização:', nodemailer.getTestMessageUrl(info));

    res.json({ message: 'Link de redefinição enviado para o e-mail.' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
  }
};