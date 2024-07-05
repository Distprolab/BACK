const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/connection");

class Estadoproceso extends Model {}

Estadoproceso.init(
	{
		ESATADO: DataTypes.INTEGER,
	},
	{
		sequelize,
		modelName: "estadoproceso",
	}
);

module.exports = Estadoproceso;
