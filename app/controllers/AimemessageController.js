const { Aimermessage } = require('../models/index');
const mysql = require('mysql');
const db = require('../../config/database')

var connexion = mysql.createConnection({
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database
})

module.exports = {
    
    async aimerMessage(req, res) {
        /*Aimermessage.create({
            idUser: req.body.idUser,
            idMessage: req.body.idMessage
        }).then(
            res.json({
                idUser: req.body.idUser,
                idMessage: req.body.idMessage
            })).catch(err => {
            res.status(500).json(err);
        })*/
        
        let idUser = req.body.idUser;
        let idMessage = req.body.idMessage;
        let date = new Date();
        let sql = "INSERT INTO aimermessages (idUser, idMessage, aime, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
        connexion.query(sql, [idUser, idMessage, 1, date, date], function(err, result) {
            if (err) {
                //throw err;
                result = err;
            } ;
            res.json(result);
        })

    },

    getNbLikes(req, res) {
        let messageId = req.params.messageId;
        let sql = "SELECT count(idUser) AS nbLikes FROM aimermessages WHERE idMessage = ?";
        connexion.query(sql, [messageId], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    },

    isLikedMessage(req, res) {
        let userId = req.params.userId;
        let messageId = req.params.messageId;
        let sql = "SELECT aime FROM aimermessages WHERE idUser = ? AND idMessage = ?";
        connexion.query(sql, [userId, messageId], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    }

}