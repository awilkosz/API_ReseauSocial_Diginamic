require('dotenv').config();

module.exports = {

  //Configuration de la BDD 
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_DATABASE || "database_development",
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: process.env.DB_DIALECT || "mysql",

  //Configuration des seeds
  seederStorage: "sequelize",
  seederStorageTableName: "seeds",

  //Configuration des Migrations
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",
}
