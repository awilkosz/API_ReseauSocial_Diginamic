const express = require('express');
const path = require('path');
//const jwtMiddelware = require("express-jwt");
require('dotenv').config();

//const { userRouter } = require("./user/router.js");

const Sequelize = require("sequelize");

//const sequelize = new Sequelize("sqlite:database.db");

const PORT = process.env.PORT || 5000;
//const SECRET = process.env.SECRET;

const app = express();

/**
 * Ce middeware valide le JWT et rajoute un attribut user à la requete.
 * Cet attribut contient la payload du jeton
 */
/*app.use(
jwtMiddelware({ secret: SECRET, algorithms: ["HS256"] }).unless({
    path: ["/user/login", "/user"],
})
);*/

/**
 * Ce middelware gere les erreurs et les transforme en JSON
 */
app.use((err, req, rep, next) => {
err ? rep.status(err.status).json({ error: err.message }) : next();
})

app.use(express.json());

//app.use("/user", userRouter(sequelize, SECRET));

//app.use(express.static('../React_ReseauSocial_Diginamic/react_reseausocial_diginamic/build'));

app.get('/api/test' , (_, res) => {
    res.send({
        msg: "Hello WORLD!"
    });
});

app.get('/*', (_, res) => {
    //res.sendFile(path.join(__dirname, '../React_ReseauSocial_Diginamic/react_reseausocial_diginamic/build/index.html'))
    res.send({
        msg: "Hello WORLD!"
    });
});

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port: ${PORT}`);
})

/*sequelize
  .sync()
  .then(() =>
    app.listen(PORT, () => console.log(`Serveur serieux sur le port ${PORT}`))
  );*/