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
        let sql = "SELECT messages.id, messages.emmetId, contenu, privacy, messages.createdAt, users.name FROM messages JOIN users ON messages.emmetId = users.id WHERE destiId = ? ORDER BY messages.createdAt DESC";
        connexion.query(sql, [destinataireId], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
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
        let sql = "SELECT messages.id, messages.emmetId, contenu, privacy, messages.createdAt, users.name FROM messages JOIN users ON messages.emmetId = users.id WHERE emmetId <> ? AND emmetId IN (SELECT amiId FROM est_amis WHERE amiId <> ? AND userId = ?) GROUP BY messages.id ORDER BY messages.createdAt DESC";
        connexion.query(sql, [id, id, id], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
        //Ancienne: SELECT * FROM messages WHERE emmetId <> ? AND emmetId IN (SELECT amiId FROM est_amis WHERE amiId <> ? AND userId = ?) ORDER BY createdAt DESC
        /*SELECT messages.id, contenu, messages.createdAt, users.name FROM messages JOIN users ON messages.emmetId = users.id WHERE emmetId <> 1 AND emmetId IN (SELECT amiId FROM est_amis WHERE amiId <> 1 AND userId = 1) GROUP BY messages.id ORDER BY messages.createdAt DESC*/
    },

    parametreConfidentialite(req, res) {
        let idMsg = req.body.id;
        let confid = req.body.privacy;
        Message.update({ privacy: confid }, { where: { id: idMsg }})
        .then(
            res.json({
                id: req.body.id,
                privacy: req.body.privacy,
            })).catch(err => {
            res.status(500).json(err);
        })
    }
}