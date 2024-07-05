const { Model, DataTypes } = require("sequelize");

const sequelize= require("../db/connection")



class Aprobar extends Model{}

Aprobar.init({

    PROCESO_ID:DataTypes.INTEGER,
    USUARIO_ID:DataTypes.INTEGER,
    ESTADOBI: DataTypes.INTEGER ,
},
{
    sequelize,
    modelName:"Aprobar",
});
module.exports=Aprobar;