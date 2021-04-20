const jwt = require('jsonwebtoken');
const authConfig = require("../../config/auth");

module.exports = (req, res, next) => {

    console.log(req.headers);

    //On vérifie que le token existe
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Accès non autorisé"});
    } else {

        //On vérifie la validité du token
        let token = req.headers.authorization.split(" ")[1];

        //On vérifie la validité de ce token
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            
            if(err) {
                res.status(500).json({ msg: "Une erreur est survenue lors de l'identification du token", err });
            } else {
                req.user = decoded;
                next();
            }
        });

    }

}