module.exports = (sequelize, DataTypes) => {
  const aseo = sequelize.define("aseo", {
    aseo_ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    codigoAseo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigoJm: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    distrito: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    coordUtmEtrs89x: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    coordUtmEtrs89y: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    fechaPuestaEnServicio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitud: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    longitud: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return aseo;
};
