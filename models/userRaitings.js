module.exports = (sequelize, DataTypes) => {
  const userRaiting = sequelize.define("userRaiting", {
    userRaiting_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigoAseo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRaiting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return userRaiting;
};
