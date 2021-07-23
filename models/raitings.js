module.exports = (sequelize, DataTypes) => {
  const raiting = sequelize.define("raiting", {
    raiting_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    codigoAseo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raiting: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return raiting;
};
