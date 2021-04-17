const { Model, DataTypes, Sequelize } = require("sequelize");

class USER extends Model {}

exports.modelUser = (sequelize) => {
    USER.init(
        {
            login: DataTypes.STRING,
            hash: DataTypes.STRING,
        },
        { sequelize }
    );
    return USER;
};