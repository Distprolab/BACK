const { Router } = require("express");
const { consultaubicacion, postubicacion, ubicacionUpdate, ubicacionDelete } = require("../controllers/ubicacion");
const { validarJWT } = require("../middleware/validar-jwt");
const { tieneRole } = require("../middleware/validar-roles");


const router = Router();

router.get("/", [validarJWT, tieneRole],consultaubicacion);
router.post("/", [validarJWT, tieneRole],postubicacion);
router.put("/:id",[validarJWT, tieneRole], ubicacionUpdate);
router.delete("/:id", [validarJWT, tieneRole],ubicacionDelete);

module.exports = router;