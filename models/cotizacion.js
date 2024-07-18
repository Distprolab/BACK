const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

class Cotizacion extends Model {}

Cotizacion.init(
	{
		RAZONSOCIAL: DataTypes.STRING,
		RUC: DataTypes.STRING,
		CORREO: DataTypes.INTEGER,
		MODALIDAD: DataTypes.INTEGER,
        ESTADISTICA:DataTypes.BOOLEAN,
        CARGA:DataTypes.BLOB,
        COMENTARIOS:DataTypes.STRING

	},
	{
		sequelize,
		modelName: "cotizacion",
	}
);
module.exports = Cotizacion;