const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Prueba extends Model {}
Prueba.init(
	{
		//item: DataTypes.INTEGER,
		resultado: DataTypes.STRING,
		fechaorden: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		horaorden: {
			type: Sequelize.TIME,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		estado: { type: DataTypes.BOOLEAN, defaultValue: true },
	},
	{
		sequelize,
		modelName: "pruebas",
	}
);

module.exports = Prueba;
