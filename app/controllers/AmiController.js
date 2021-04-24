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
        
        est_ami.create({
            userId: req.body.idUser,
            amiId: req.body.idAmi,
        }).then(
            res.json({
                userId: req.body.idUser,
                amiId: req.body.idAmi,
            })).catch(err => {
            res.status(500).json(err);
        })

    },

    getFriendRequests(req, res) {
        let id = req.params.id;
        let sql = "SELECT est_amis.id, userId, amiId, statut, users.id, name, email FROM est_amis INNER JOIN users ON est_amis.userId = users.id WHERE amiId = ? AND statut = 0";
        connexion.query(sql, [id], function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    },

    getFriends(req, res) {
        let id = req.params.id;
        let sql = "SELECT est_amis.id, userId, amiId, statut, users.id, name, email FROM est_amis INNER JOIN users ON est_amis.userId = users.id WHERE amiId = ? AND statut = 1";
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

        /*est_ami.create({
            userId: req.body.idUser,
            amiId: req.body.idAmi,
            statut: 1
        }).then(
            res.json({
                userId: req.body.idUser,
                amiId: req.body.idAmi,
                statut: 1
            })).catch(err => {
            res.status(500).json(err);
        })*/
    },

    accepterInvitationPartDeux(req, res) {

        est_ami.create({
            userId: req.body.idUser,
            amiId: req.body.idAmi,
            statut: 1
        }).then(
            res.json({
                userId: req.body.idUser,
                amiId: req.body.idAmi,
                statut: 1
            })).catch(err => {
            res.status(500).json(err);
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
    }
}