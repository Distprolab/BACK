const { Router } = require("express");

const { validarJWT } = require("../middleware/validar-jwt");
const { tieneRole } = require("../middleware/validar-roles");

const { getPedidoStock, getAllPedidoStock, getFiltroPedidoStock, updatePedidoStock, createPedidoStock, deletePedidoStock, getReportePdfPedidoStock } = require("../controllers/pedidoStock");

const router = Router();
router.get("/",[validarJWT, tieneRole], getPedidoStock);
router.get("/filtros/:id",[validarJWT, tieneRole],getAllPedidoStock)
router.get("/reporte-pdf/:id",[validarJWT, tieneRole],getReportePdfPedidoStock)
router.get("/:id", [validarJWT, tieneRole],getFiltroPedidoStock);
router.put("/:id", [validarJWT, tieneRole],updatePedidoStock);
router.post("/",[validarJWT, tieneRole],createPedidoStock);
router.delete("/:id", [validarJWT, tieneRole], deletePedidoStock);



module.exports = router;
