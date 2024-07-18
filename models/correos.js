const { Model, DataTypes } = require("sequelize");

const sequelize=require("../db/connection")




class Correo extends Model{}
Correo.init({

nombres:DataTypes.STRING,
apellidos:DataTypes.STRING,
correo:DataTypes.STRING,
estado:{
    type:DataTypes.BOOLEAN,
    defaultValue:1
}


},
{
    sequelize,
    modelName:'correos'
});
module.exports=Correo;