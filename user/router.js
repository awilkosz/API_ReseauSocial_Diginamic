const express = require("express");
const { modelUser } = require("./model");
const { Service } = require("./service");
const jwtMiddelware = require("express-jwt");

const router = express.Router();


exports.userRouter = (sequelize, secret) => {
  // Le model de base de données
  const USER = modelUser(sequelize);
  // Le service metier
  const service = Service(USER, secret);

  /**
   * Cette route renvoie l'utilisateur connecté
   */
  router.get("/me", (req, rep) => {
    service.me(req.user).then((user) => rep.json(user));
  });

  /**
   * Cette route permet de se connecter
   * Le body de la requete doit contenir le mot de passe et le login
   */
  router.post("/login", (req, rep) => {
    const { login, password } = req.body;
    service
      .logUser(login, password)
      .then((token) =>
        token ? rep.json({ token }) : rep.status(403).json({ error: "oups" })
      );
  });

  /**
   * Cette route permet de se créer un compte
   * Le body de la requete doit contenir le mot de passe et le login
   */
  router.post("/", (req, rep) => {
    service.create(req.body).then(() => rep.json(req.body));
  });

  return router;
};