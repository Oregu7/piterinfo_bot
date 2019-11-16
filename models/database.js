const Sequelize = require("sequelize");
const config = require("config");
const database = config.get("database");

//database.password
const sequelize = new Sequelize(database.name, database.user, database.password, {
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;