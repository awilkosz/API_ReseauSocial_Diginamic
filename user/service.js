const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const hash = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

exports.Service = (MODEL, secret) => {
  /**
   * Essayes de deconnecter un utilisateur
   * @param {*} login chaine de caracteres
   * @param {*} password  chaine de caracteres
   * @returns un JWT en cas de succés
   */
  const logUser = async (login, password) => {
    const user = await MODEL.findOne({ where: { login } });
    const valid = await compare(password, user.hash);
    if (!valid) return;
    return jwt.sign({ login }, secret, {
      expiresIn: "1h",
    });
  };

  /**
   * Crée un utilisateur avec le role VIEWER
   * @param {*} user un utilisateur
   * @returns l'utilisateur inséeré en base
   */
  const create = async (user) => {
    const hashedPassword = await hash(user.password);
    return await MODEL.create({ ...user, hash: hashedPassword });
  };

  /**
   * Récupere l'utilisateur connecté en base de donnée
   * @param {*} utilisateur contenant un login
   * @returns l'utilisateur connecté
   */
  const me = async ({ login }) => {
    return { login, role };
  };
  return { logUser, create, me };
};