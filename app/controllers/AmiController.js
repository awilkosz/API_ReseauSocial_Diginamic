const { est_ami } = require('../models/index');
const mysql = require('mysql');
const db = require('../../config/database')

var connexion = mysql.createConnection({
    host: db.host,
    user: db.username,
    password: db.password,
    database: db.database
})

module.exports = {
    
    demanderEnAmi(req, res) {
        let userId = req.body.idUser;
        let amiId = req.body.idAmi;
        let date = new Date();
        let sql = "INSERT INTO est_amis (userId, amiId, statut, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
        connexion.query(sql, [userId, amiId, 0, date, date], function(err, result) {
            if (err) {
                //throw err;
                result = err;
            } ;
            res.json(result);
        })

    },

    getFriendRequests(req, res) {
        let id = req.params.id;
        let sql = "SELECT userId, amiId, statut, users.id, name, email FROM est_amis INNER JOIN users ON est_amis.userId = users.id WHERE amiId = ? AND statut = 0";
        connexion.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    },

    getFriends(req, res) {
        let id = req.params.id;
        let sql = "SELECT userId, amiId, statut, users.id, name, email FROM est_amis INNER JOIN users ON est_amis.userId = users.id WHERE amiId = ? AND statut = 1";
        connexion.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    },

    accepterInvitation(req, res) {
        let userId = req.body.idAmi;
        let amiId = req.body.idUser;
        est_ami.update({ statut: 1 }, { where: { userId: userId, amiId: amiId }})
        .then(
            res.json({
                userId: req.body.idUser,
                amiId: req.body.idAmi,
            })).catch(err => {
            res.status(500).json(err);
        })
    },

    /*refuserInvitation(req, res) {
        let userId = req.params.idUser;
        let amiId = req.params.idAmi;
        est_ami.destroy({
            where: {
                userId: userId,
                amiId: amiId
            }
        }).then(
            res.json({
                userId: req.body.idUser,
                amiId: req.body.idAmi,
            })).catch(err => {
            res.status(500).json(err);
        })
    },*/

    accepterInvitationPartDeux(req, res) {

        let userId = req.body.idUser;
        let amiId = req.body.idAmi;
        let date = new Date();
        let sql = "INSERT INTO est_amis (userId, amiId, statut, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
        connexion.query(sql, [userId, amiId, 1, date, date], function(err, result) {
            if (err) {
                //throw err;
                result = err;
            } ;
            res.json(result);
        })
    },

    estAmi(req, res) {
        let userId = req.params.userId;
        let amiId = req.params.amiId;
        let sql = "SELECT COUNT(*) AS estAmi FROM est_amis INNER JOIN users ON est_amis.userId = users.id WHERE userId = ? AND amiId = ? AND statut = 1";
        connexion.query(sql, [userId, amiId], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    },

    estAmi2(req, res) {
        let userId = req.params.userId;
        let amiId = req.params.amiId;
        let sql = "SELECT statut FROM est_amis WHERE userId = ? AND amiId = ?";
        connexion.query(sql, [userId, amiId], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    }
}