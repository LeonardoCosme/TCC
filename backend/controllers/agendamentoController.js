const { Agendamento, User } = require('../models');

// ✅ Criar agendamento
exports.criar = async (req, res) => {
  try {
    const { clienteId, prestadorId, servico, dataAgendada, horaAgendada } = req.body;

    if (!clienteId || !prestadorId || !servico || !dataAgendada || !horaAgendada) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const novoAgendamento = await Agendamento.create({
      clienteId,
      prestadorId,
      servico,
      dataAgendada,
      horaAgendada
    });

    return res.status(201).json({
      message: 'Agendamento criado com sucesso!',
      agendamento: novoAgendamento
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    return res.status(500).json({ error: 'Erro ao processar o agendamento.' });
  }
};

// ✅ Listar agendamentos para o prestador autenticado
exports.listarPorPrestador = async (req, res) => {
  try {
    const prestadorId = req.userId;

    const agendamentos = await Agendamento.findAll({
      where: { prestadorId },
      order: [['dataAgendada', 'ASC'], ['horaAgendada', 'ASC']]
    });

    return res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    return res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};

// ✅ Listar agendamentos para o cliente autenticado
exports.listarPorCliente = async (req, res) => {
  try {
    const clienteId = req.userId;

    const agendamentos = await Agendamento.findAll({
      where: { clienteId },
      include: [
        {
          model: User,
          as: 'prestador',
          attributes: ['name', 'phone', 'email']
        }
      ],
      order: [['dataAgendada', 'DESC'], ['horaAgendada', 'DESC']]
    });

    return res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos do cliente:', error);
    return res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};
