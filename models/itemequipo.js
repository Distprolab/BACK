const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Itemequipo extends Model {}

Itemequipo.init(
	{
		Itemequipo: {
			//ID_PRODUCTO
			type: DataTypes.INTEGER,
		},

		CANTIDAD: { type: DataTypes.INTEGER },

		fecha: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},

		ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },
	},
	{
		sequelize,
		modelName: "itemequipo",
	}
);
module.exports = Itemequipo;