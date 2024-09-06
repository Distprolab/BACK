const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Panel_pruebas extends Model {}

Panel_pruebas.init(
  {
    CODIGO: {
      type: DataTypes.STRING,
    },
    NOMBRE: {
      type: DataTypes.STRING,
    },
    CATEGORIA: {
      type: DataTypes.STRING,
    },

    TIEMPO: {
      type: DataTypes.INTEGER,
    },
    VALOR: {
      type: DataTypes.FLOAT,
    },
    favorite:DataTypes.BOOLEAN,
    ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },
    USUARIO_ID: DataTypes.INTEGER,
    CREATEDBY:DataTypes.INTEGER,
    UPDATEDBY:DataTypes.INTEGER,
    DELETEDBY:DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "panel_prueba",
  },
);
module.exports = Panel_pruebas;
