const { Router } = require("express");

const { tieneRole } = require("../middleware/validar-roles");
const { validarJWT } = require("../middleware/validar-jwt");

const router = Router();

router.get("/", [validarJWT, tieneRole],);
router.post("/", [validarJWT, tieneRole],);
router.put("/:id",[validarJWT, tieneRole], );
router.delete("/:id",[validarJWT, tieneRole], );

module.exports = router;