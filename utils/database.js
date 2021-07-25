const { Sequelize, DataTypes } = require("sequelize");

const UserModel = require("../models/users");
const AseoModel = require("../models/aseos");
const RaitingModel = require("../models/raitings");
const UserRaitingModel = require("../models/userRaitings");

const sequelize = new Sequelize(
  process.env.MY_SQL_DATABASE,
  process.env.MY_SQL_USER,
  process.env.MY_SQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MY_SQL_HOST,
    port: process.env.MY_SQL_PORT,
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 30000,
      evict: 15000,
    },
  }
);

const user = UserModel(sequelize, DataTypes);
const aseo = AseoModel(sequelize, DataTypes);
const raiting = RaitingModel(sequelize, DataTypes);
const userRaiting = UserRaitingModel(sequelize, DataTypes);

module.exports = { sequelize, user, aseo, raiting, userRaiting };

