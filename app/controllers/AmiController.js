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
        // Créer un message
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
        let sql = "SELECT est_amis.id, userId, amiId, users.id, name, email FROM est_amis INNER JOIN users ON est_amis.userId = users.id WHERE amiId = ?";
        connexion.query(sql, [id], function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        })
    },

    accepterInvitation(req, res) {
        let userId = req.body.idUser;
        let amiId = req.body.idAmi;
        est_ami.update({ statut: 1 }, { where: { userId: userId, amiId: amiId }})
        .then(
            res.json({
                userId: req.body.idUser,
                amiId: req.body.idAmi,
            })).catch(err => {
            res.status(500).json(err);
        })
    }
}