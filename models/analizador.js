const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Analizador extends Model {}

Analizador.init(
	{
		NOMBRE: { type: DataTypes.STRING },
		
    
		ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },		
	},
	{
		sequelize,
		modelName: "analizadors",
	}
);
module.exports = Analizador;
