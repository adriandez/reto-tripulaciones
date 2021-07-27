module.exports = (sequelize, DataTypes) => {
  const cruce = sequelize.define("cruce", {
    cruce_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    codigoDeVIaTratado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    literalCompletoDelVialTratado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    claseDeLaViaTratado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    particulaDeLaViaTratado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombreDeLaViaTratado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigoDeViaQueCruzaOEnlaza: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    literalCompletoDelVialQueCruza: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    claseDeLaViaQueCruza: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    particulaDeLaViaQueCruza: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombreDeLaViaQueCruza: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    coordenadaX: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    coordenadaY: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  });
  return cruce;
};
