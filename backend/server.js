const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// 🔐 Segurança e compatibilidade de CORS
app.use(cors({
  origin: '*', // Você pode restringir isso para o domínio do frontend, se desejar.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 🔄 Suporte a JSON
app.use(express.json());

// 📦 Importa as rotas da pasta routes/index.js
const routes = require(path.join(__dirname, 'routes'));
app.use('/api', routes);

// 🌐 Rota raiz para teste
app.get('/', (req, res) => {
  res.send('✅ API rodando corretamente.');
});

// 🚀 Inicia o servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
