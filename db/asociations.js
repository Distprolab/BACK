const { Model } = require("sequelize");
const Aprobar = require("../models/aprobarproceso");
const Cabecera = require("../models/cabecera");
const Cabecera_Agen = require("../models/cabecera_agen");
const Cliente = require("../models/cliente");
const Detalle = require("../models/detalle");
const Detalle_Agen = require("../models/detalle_agen");
const Equipos = require("../models/equipos");
const Itempedido = require("../models/itemPedido");
const ItemStock = require("../models/itemStock");
const Itempedidostock = require("../models/itempedidostock");
const Marca = require("../models/marca");
const Pedido = require("../models/pedido");
const PedidoStock = require("../models/pedidostock");
const Proceso = require("../models/proceso");
const Producto = require("../models/productos");
const Servicio = require("../models/servicio");
const Stock = require("../models/stock");
const Envase = require("../models/tipoTubo");
const Tubo = require("../models/tubo");
const Usuario = require("../models/usuarios");
const Modelo = require("../models/modelo");
const Estado = require("../models/estado");
const Ubicacion = require("../models/ubicacion");
const Accesorio = require("../models/accesorio");
const Solicitud_Proceso = require("../models/solicitud_proceso");
const Itemequipo = require("../models/itemEquipo");
const Estadoproceso = require("../models/estadoproceso");
const Tipocontrato = require("../models/tipocontrato");
const Analizador = require("../models/analizador");

/* Producto.hasMany(Stock,{as:"inventario",foreignKey:"productoId"});
Stock.belongsTo(Producto,{as:"product"}) */

Modelo.hasMany(Analizador, { as: "instrumento", foreignKey: "modeloId" });
Analizador.belongsTo(Modelo, { as: "modelo" });

Tipocontrato.hasMany(Estadoproceso, {as: "status",foreignKey: "tipocontratoId",});
Estadoproceso.belongsTo(Tipocontrato, { as: "tipocontrato" });

Proceso.hasOne(Estadoproceso, { as: "status", foreignKey: "procesoId" });
Estadoproceso.belongsTo(Proceso, { as: "tramites" });

Proceso.hasOne(Pedido, { as: "pedidos", foreignKey: "pedidosId" });
Pedido.belongsTo(Proceso, { as: "tramites" });

Proceso.hasOne(Aprobar, { as: "aprobar", foreignKey: "procesoId" });
Aprobar.belongsTo(Proceso, { as: "tramites" });

Proceso.hasOne(Solicitud_Proceso, {	as: "solicitud",	foreignKey: "solicitudId",});
Solicitud_Proceso.belongsTo(Proceso, { as: "tramites" });

//Modelo.hasMany(Equipos,{as:"categoria",foreignKey:"modeloId"});
//Modelo.hasMany(Equipos,{as:"equipos",foreignKey:"equipoId"});
/* RELACION DE EQUIPOS */

Marca.hasMany(Equipos, { as: "equipos", foreignKey: "marcaId" });
Equipos.belongsTo(Marca, { as: "marca" });

Modelo.hasMany(Equipos, { as: "equipos", foreignKey: "modeloId" });
Equipos.belongsTo(Modelo, { as: "modelo" });

Estado.hasMany(Equipos, { as: "equipos", foreignKey: "estadoId" });
Equipos.belongsTo(Estado, { as: "estado" });

Ubicacion.hasMany(Equipos, { as: "equipos", foreignKey: "ubicacionId" });
Equipos.belongsTo(Ubicacion, { as: "ubicacion" });

Solicitud_Proceso.hasMany(Itemequipo, {	as: "itemequipo",	foreignKey: "itemequipoId",});
Itemequipo.belongsTo(Solicitud_Proceso, { as: "solicitud" });

Equipos.hasMany(Accesorio, { as: "acc", foreignKey: "equipoId" });
Accesorio.belongsTo(Equipos, { as: "equipo" });
/* Usuario.hasMany(Proceso,{as:"user" ,foreignKey:"usuarioId"});
Proceso.belongsTo(Usuario,{as:"tramites"}) */

Usuario.hasMany(Pedido, { as: "pedidos", foreignKey: "usuarioId" });
Pedido.belongsTo(Usuario, { as: "user" });

Usuario.hasMany(PedidoStock, { as: "pedidostock", foreignKey: "usuarioId" });
PedidoStock.belongsTo(Usuario, { as: "user" });

Cliente.hasMany(Pedido, { as: "pedidos", foreignKey: "clienteId" });
Pedido.belongsTo(Cliente, { as: "clientes" });

Marca.hasMany(Pedido, { as: "pedidos", foreignKey: "marcaId" });
Pedido.belongsTo(Marca, { as: "marcas" });

Pedido.hasMany(Itempedido, { as: "items", foreignKey: "pedidoId" });
Itempedido.belongsTo(Pedido, { as: "pedidos" });

PedidoStock.hasMany(Itempedidostock, {	as: "itemstock",	foreignKey: "pedidostockId",});
Itempedidostock.belongsTo(PedidoStock, { as: "pedidostock" });

Producto.hasMany(Itempedido, { as: "items", foreignKey: "productoId" });
Itempedido.belongsTo(Producto, { as: "product" });

Producto.hasMany(Itempedidostock, {	as: "itemstock",	foreignKey: "productoId",});
Itempedidostock.belongsTo(Producto, { as: "product" });

Cabecera.hasMany(Detalle, { as: "pruebas", foreignKey: "cabeceraId" });
Detalle.belongsTo(Cabecera, { as: "pacientes" });

Stock.hasMany(ItemStock, { as: "stockItem", foreignKey: "stockId" });
ItemStock.belongsTo(Stock, { as: "inventario" });

Producto.hasMany(ItemStock, { as: "stockItem", foreignKey: "productoId" });
ItemStock.belongsTo(Producto, { as: "product" });

//ItemStock.belongsTo(Producto, { foreignKey: "productoId", as: "product" });

Cabecera_Agen.hasMany(Detalle_Agen, { as: "as400", foreignKey: "cabeceraId" });
Detalle_Agen.belongsTo(Cabecera_Agen, { as: "personas" });
Cabecera.hasMany(Tubo, { as: "tubos", foreignKey: "pacientesId" });
Tubo.belongsTo(Cabecera, { as: "pacientes" });
Tubo.hasMany(Envase, { as: "envase", foreignKey: "tuboId" });
Envase.belongsTo(Tubo, { as: "tubos" });
