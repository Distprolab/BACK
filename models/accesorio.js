const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Accesorio extends Model {}

Accesorio.init(
	{
		ACCMODELO_ID: DataTypes.STRING,

		SERIE: DataTypes.STRING,
		USUARIO_ID: DataTypes.INTEGER,

		ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },
	},
	{
		sequelize,
		modelName: "accesorio",
	}
);
module.exports = Accesorio;
