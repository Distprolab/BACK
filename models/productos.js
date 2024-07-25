const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Producto extends Model {}

Producto.init(
	{
		REFERENCIA: {
			type: DataTypes.STRING,
			unique: true,
		},
		NOMBRE: {
			type: DataTypes.STRING,
		},
		CATEGORIA: {
			type: DataTypes.STRING,
		},
		UNIDAD: { type: DataTypes.STRING },
		GENERACION: { type: DataTypes.STRING },
		VALOR: { type: DataTypes.DOUBLE },
		ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },
	},
	{
		sequelize,
		modelName: "producto",
	}
);
module.exports = Producto;
