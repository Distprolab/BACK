const { DataTypes, Sequelize, Model } = require("sequelize");

const sequelize = require("../db/connection");


class Ubicacion extends Model {}

Ubicacion.init({

    NOMBRE:{
        type:DataTypes.STRING
    },
	ESTADO: { type: DataTypes.INTEGER, defaultValue: 1 },

},
{
    sequelize,
    modelName:"ubicacion"
});
module.exports=Ubicacion