const { Sequelize, DataTypes, Model } = require("sequelize");

const db = require("../db/connection");

const Usuario = db.define(
  "Usuario",
  {
    doctor: {
      type: DataTypes.STRING,
    },
    codigo_doctor: {
      type: DataTypes.STRING,
    },
    usuario: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    rol: {
      type: DataTypes.STRING,
    },

    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },

  {
    freezeTableName: true,
    tableName: "usuarios",
    timestamps: false,
  },
);
// UsuarioSchema.methods.toJSON = function() {
//  const { __v, password, id, ...usuario  } = this.toObject();
//    usuario.uid = _id;
//   return usuario;
/// }
module.exports = Usuario;
