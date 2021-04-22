'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class est_ami extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      est_ami.belongsTo(models.User, { as: "utilisateur", foreignKey: "id" });
      est_ami.belongsTo(models.User, { as: "unAmi", foreignKey: "id" });
    }
  };
  est_ami.init({
    statut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'est_ami',
    tableName: 'est_amis'
  });
  return est_ami;
};