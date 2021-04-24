const { Aimermessage } = require('../models/index');

module.exports = {
    
    aimerMessage(req, res) {
        // Créer un message
        Aimermessage.create({
            idUser: req.body.idUser,
            idMessage: req.body.idMessage,
            aime: 1,
        }).then(
            res.json({
                idUser: req.body.idUser,
                idMessage: req.body.idMessage,
                aime: 1,
            })).catch(err => {
            res.status(500).json(err);
        })
    },

}