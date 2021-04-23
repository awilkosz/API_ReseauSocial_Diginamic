const { Message } = require('../models/index');
const mysql = require('mysql');
const db = require('../../config/database')

var connexion = mysql.createConnection({
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database
});

module.exports = {
    
    async index(req, res) {
        let messages = await Message.findAll();
        
        res.json(messages);
    },

    async getMessagesUser(req, res) {
        let destinataireId = req.params.destiId;
        let messages = await Message.findAll({ where: { destiId: destinataireId }});
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
        }).then(
            res.json({
                contenu: req.body.contenu,
                privacy: req.body.confidentialite,
                emmetId: req.body.author,
                destiId: req.body.desti
            })).catch(err => {
            res.status(500).json(err);
        })
    },

    getFilActualite(req, res) {
        let id = req.params.id;
        let sql = "SELECT * FROM messages WHERE emmetId NOT IN (SELECT userId FROM est_amis WHERE userId = ?) AND (privacy LIKE 'Public' OR privacy LIKE 'Amis') ORDER BY createdAt DESC";
        connexion.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    },
}