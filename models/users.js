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
  });
  return user;
};
