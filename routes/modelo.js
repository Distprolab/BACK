const { Router } = require("express");
const {
	modeloDelete,
	modeloUpdate,
	postmodelo,
	consultamodelo,
} = require("../controllers/modelo");
const { validarJWT } = require("../middleware/validar-jwt");
const { tieneRole } = require("../middleware/validar-roles");

const router = Router();

router.get("/", [validarJWT, tieneRole],consultamodelo);
router.post("/",[validarJWT, tieneRole], postmodelo);
router.put("/:id", [validarJWT, tieneRole],modeloUpdate);
router.delete("/:id",[validarJWT, tieneRole], modeloDelete);

module.exports = router;