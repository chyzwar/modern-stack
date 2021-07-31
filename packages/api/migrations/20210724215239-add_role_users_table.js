
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', "role", {
    type: Sequelize.STRING,
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeColumn('users', "role"),
};
