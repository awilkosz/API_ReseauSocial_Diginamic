'use strict';

const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return Promise.all([

      User.create({
        name: "Anton",
        email: "an@tony.fr",
        password: bcrypt.hashSync("123456", Number.parseInt(authConfig.rounds)),
        posts: [
          {
            title: "Titre 1",
            body: "Body 1"
          },
          {
            title: "Titre 2",
            body: "Body 2"
          },
        ]
      }, {
        include: "posts"
      }),

      User.create({
        name: "Lucie",
        email: "lu@cie.fr",
        password: bcrypt.hashSync("123456", Number.parseInt(authConfig.rounds)),
        posts: [
          {
            title: "Titre 3",
            body: "Body 3"
          },
          {
            title: "Titre 4",
            body: "Body 4"
          },
        ]
      }, {
        include: "posts"
      }),

    ])
  },

  down: async (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.bulkDelete('posts', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ]);

  }
};
