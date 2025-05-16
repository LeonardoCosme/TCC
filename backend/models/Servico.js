const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Servico = sequelize.define('Servico', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    tipo: DataTypes.STRING,
    observacao: DataTypes.TEXT,
    local: DataTypes.STRING,
    valor: DataTypes.DECIMAL(10, 2),
    urgente: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    criadoEm: {
      type: DataTypes.DATE,
      field: 'criado_em'
    },
    atualizadoEm: {
      type: DataTypes.DATE,
      field: 'atualizado_em'
    }
  }, {
    tableName: 'servicos',
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
    timestamps: true
  });

  return Servico;
};
