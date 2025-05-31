const { ServicoDisponivel } = require('../models');

exports.listar = async (req, res) => {
  try {
    const servicos = await ServicoDisponivel.findAll();
    res.json(servicos);
  } catch (err) {
    console.error('Erro ao buscar serviços disponíveis:', err);
    res.status(500).json({ error: 'Erro ao buscar os serviços disponíveis' });
  }
};
