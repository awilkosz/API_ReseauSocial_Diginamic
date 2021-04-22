const { Message } = require('../models/index');

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
}