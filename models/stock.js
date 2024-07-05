const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Stock extends Model {}

Stock.init(
	{
		guia: {
			type: DataTypes.STRING,
		},

		fechaIngreso: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		usuario: { type: DataTypes.INTEGER },
		ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },
	},
	{
		sequelize,
		modelName: "stock",
	}
);
module.exports = Stock;