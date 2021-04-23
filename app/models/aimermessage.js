'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aimermessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Aimermessage.init({
    aime: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Aimermessage',
    tableName: 'aimermessage'
  });
  return Aimermessage;
};