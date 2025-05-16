const { Prestador } = require('../models');
require('dotenv').config();

// 🔍 Buscar dados do prestador logado
exports.getMe = async (req, res) => {
  try {
    const prestador = await Prestador.findOne({
      where: { userId: req.userId },
    });

    if (!prestador) {
      return res.status(404).json({ error: 'Prestador não encontrado.' });
    }

    return res.json(prestador);
  } catch (error) {
    console.error('Erro ao buscar prestador:', error);
    return res.status(500).json({ error: 'Erro ao buscar dados do prestador.' });
  }
};

// 💾 Criar ou atualizar dados do prestador
exports.savePrestador = async (req, res) => {
  const userId = req.userId;

  const {
    nome,
    cpf,
    endereco_residencial, // recebido do frontend
    endereco_comercial,   // recebido do frontend
    telefone,
    profissao,
    empresa,
    entrada,
    saida,
    cnpj
  } = req.body;

  if (!nome || !cpf || !telefone || !endereco_residencial || !profissao) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    const existing = await Prestador.findOne({ where: { userId } });

    const dados = {
      userId,
      nome,
      cpf,
      telefone,
      enderecoResidencial: endereco_residencial,
      enderecoComercial: endereco_comercial,
      profissao,
      empresa,
      entrada,
      saida,
      cnpj
    };

    if (existing) {
      await existing.update(dados);
      return res.json({ message: 'Dados do prestador atualizados com sucesso!' });
    }

    await Prestador.create(dados);
    return res.status(201).json({ message: 'Prestador cadastrado com sucesso!' });

  } catch (error) {
    console.error('Erro ao salvar prestador:', error);
    return res.status(500).json({ error: 'Erro ao salvar dados do prestador.' });
  }
};
