const { Servico } = require('../models');
const { check, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// 🛡️ Middleware de validação
exports.validateServico = [
  check('nome').trim().escape().notEmpty().withMessage('Nome é obrigatório'),
  check('telefone').trim().isLength({ min: 10 }).withMessage('Telefone inválido'),
  check('tipo').trim().escape().notEmpty().withMessage('Tipo é obrigatório'),
  check('local').trim().escape().notEmpty().withMessage('Local é obrigatório'),
  check('valor').isFloat({ min: 0 }).withMessage('Valor deve ser um número positivo')
];

// 💾 Criar novo serviço
exports.createServico = async (req, res) => {
  const userId = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const {
    nome,
    telefone,
    tipo,
    observacao,
    local,
    valor,
    urgente
  } = req.body;

  try {
    const novoServico = await Servico.create({
      userId,
      nome: sanitizeHtml(nome),
      telefone: sanitizeHtml(telefone),
      tipo: sanitizeHtml(tipo),
      observacao: sanitizeHtml(observacao || ''),
      local: sanitizeHtml(local),
      valor,
      urgente: urgente === true
    });

    return res.status(201).json(novoServico);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar serviço' });
  }
};

// 🔍 Listar serviços
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
