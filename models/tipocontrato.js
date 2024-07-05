const { Model, DataTypes,Sequelize } = require("sequelize");
const sequelize = require("../db/connection");
class Tipocontrato extends Model {}

Tipocontrato.init(
	{
		NOMBRE: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "tipocontrato",
	}
);

module.exports = Tipocontrato ;
