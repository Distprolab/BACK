const Cabecera = require("../models/cabecera");
const Cabecera_Agen = require("../models/cabecera_agen");
const Detalle = require("../models/detalle");
const Detalle_Agen = require("../models/detalle_agen");
const Proceso = require("../models/proceso");
const Servicio = require("../models/servicio");
const Envase = require("../models/tipoTubo");
const Tubo = require("../models/tubo");
const Usuario = require("../models/usuarios");


/* Usuario.hasMany(Proceso,{as:"user" ,foreignKey:"usuarioId"});
Proceso.belongsTo(Usuario,{as:"tramites"}) */


Cabecera.hasMany(Detalle, { as: "pruebas", foreignKey: "cabeceraId" });
Detalle.belongsTo(Cabecera, { as: "pacientes" });
Cabecera_Agen.hasMany(Detalle_Agen, { as: "as400", foreignKey: "cabeceraId" });
Detalle_Agen.belongsTo(Cabecera_Agen, { as: "personas" });
Cabecera.hasMany(Tubo, { as: "tubos", foreignKey: "pacientesId" });
Tubo.belongsTo(Cabecera, { as: "pacientes" });
Tubo.hasMany(Envase, { as: "envase", foreignKey: "tuboId" });
Envase.belongsTo(Tubo, { as: "tubos" });
