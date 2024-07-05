const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Modelo  extends Model {}

Modelo.init(
  {
    
    NOMBRE: {
      type: DataTypes.STRING,
    },
    

    USUARIO_ID: DataTypes.INTEGER,
   

    ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  {
    sequelize,
    modelName: "modelos",
  },
);
module.exports = Modelo;