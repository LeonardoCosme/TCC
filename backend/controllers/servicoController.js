const { Servico } = require('../models');

exports.createServico = async (req, res) => {
  const userId = req.userId;

  const { nome, telefone, tipo, observacao, local, valor, urgente } = req.body;

  try {
    const novoServico = await Servico.create({
      userId,
      nome,
      telefone,
      tipo,
      observacao,
      local,
      valor,
      urgente
    });

    return res.status(201).json(novoServico);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar serviço' });
  }
};

exports.getServicos = async (req, res) => {
  try {
    const servicos = await Servico.findAll({
      order: [['urgente', 'DESC'], ['criado_em', 'DESC']]
    });

    return res.json(servicos);
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    return res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
};
