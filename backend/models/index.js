const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false
  }
);

// Importa os modelos passando a conexão
const User = require('./User')(sequelize);
const Prestador = require('./Prestador')(sequelize);
const Servico = require('./Servico')(sequelize); // ✅ ADICIONADO

// Exporta os modelos e a conexão
module.exports = {
  sequelize,
  Sequelize,
  User,
  Prestador,
  Servico // ✅ ADICIONADO
};
