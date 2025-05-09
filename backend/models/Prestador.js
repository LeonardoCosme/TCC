const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Prestador = sequelize.define('Prestador', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId' // nome da coluna no MySQL
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enderecoResidencial: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'endereco_residencial'
    },
    enderecoComercial: {
      type: DataTypes.STRING,
      field: 'endereco_comercial'
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING
    },
    entrada: {
      type: DataTypes.DATEONLY
    },
    saida: {
      type: DataTypes.DATEONLY
    },
    cnpj: {
      type: DataTypes.STRING
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
    tableName: 'prestadores',
    timestamps: false // desativado porque os campos são personalizados (criado_em, atualizado_em)
  });

  return Prestador;
};
