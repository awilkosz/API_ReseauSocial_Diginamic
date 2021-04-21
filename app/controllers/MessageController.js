const { Message } = require('../models/index');
const db = require('../../config/database');

const mysql = require('mysql');

/*var con = mysql.createConnection({
  host: db.host,
  user: db.username,
  password: db.password,
  database: db.database
});*/

module.exports = {
    
    async index(req, res) {
        let messages = await Message.findAll();
        
        res.json(messages);
    },

    async getMessagesUser(req, res) {
        let emmeteurId = req.params.emmetId;
        let messages = await Message.findAll({ where: { emmetId: emmeteurId }});
        res.json(messages);
    },

    //Nouveau message
    publierMessage(req, res) {
        // Créer un message
        Message.create({
            contenu: req.body.contenu,
            privacy: req.body.confidentialite,
            emmetId: req.body.author,
            destiId: req.body.desti
        }).catch(err => {
            res.status(500).json(err);
        });

    },
}