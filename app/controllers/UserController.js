const { User } = require('../models/index');
const { Op } = require("sequelize");

module.exports = {

    async getUserByName(req, res) {
        let name = req.params.name;
        let users = await User.findAll({
            where: {
                name: {
                    [Op.substring]: name,
                }
            }
        })
        res.json(users);
    },

    async getUserById(req, res) {
        let id = req.params.id
        let user = await User.findOne({
            where: {
                id: id,
            }
        });
        res.json(user);
    },

}