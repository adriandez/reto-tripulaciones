module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    user_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    tutorial: {
      type: DataTypes.BOOLEAN,
      default: true,
      allowNull: false,
    },
    blood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cm: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    enfermedad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    medical: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    support: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  return user;
};
