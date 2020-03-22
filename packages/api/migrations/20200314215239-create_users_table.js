
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    provider: Sequelize.STRING,
    provider_id: Sequelize.STRING,
    password: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
