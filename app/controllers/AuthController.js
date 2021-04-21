const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const { Op } = require("sequelize");

module.exports = {

    //Connexion
    signIn(req, res) {

        let { email, password } = req.body;

        // On récupère l'utilisateur
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            
            if(!user) {
                res.status(404).json({ msg: "Cet utilisateur n'existe pas" });
            } else {

                if(bcrypt.compareSync(password, user.password)) {

                    // Création du token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {
                    // Accès non autorisé
                    res.status(401).json({ msg: "Identifiants incorrects" });
                };
            }

        }).catch(err => {
            res.status(500).json(err);
        });
    },

    //Inscription
    signUp(req, res) {

        //Cryptage du mot de passe
        let password = bcrypt.hashSync(req.body.passwordReg, Number.parseInt(authConfig.rounds));
        //Note: Il faut installer la librairie "validator" qui utilise sequelize en interne
        //      Ou simplement comparer que password.length > 6

        // Créer un utilisateur
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {
            // Création du token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    },

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
}