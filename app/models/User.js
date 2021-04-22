'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { as: "posts", foreignKey: "userId" });

      User.hasMany(models.Message, { as: "messages", foreignKey: "emmetId" });
      User.hasMany(models.Message, { as: "messagesRecus", foreignKey: "destiId" });

      User.hasMany(models.est_ami, { as: "idUser", foreignKey: "userId" });
      User.hasMany(models.est_ami, { as: "idAmi", foreignKey: "amiId" });
    }

  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "Le nom peut seulement contenir des lettres"
        },
        len: {
          args: [2, 255],
          msg: "La taille du nom doit être de 2 à 255 caractères"
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "L'email doit être valide"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "Le mot de passe doit faire au moins six caractères"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });

  return User;
};