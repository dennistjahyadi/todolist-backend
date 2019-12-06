'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const username = "admin"
    const password = "adminadmin"
    const encryptedPass = await bcrypt.hash(password, 10)
    const token = await bcrypt.hash(username+password, 10)
    return queryInterface.bulkInsert('Users', [{
      username: username,
      password: encryptedPass,
      token: token,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
