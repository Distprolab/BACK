const { Router } = require("express");

const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../middleware/validar-roles");
const { getAnalizador, createAnalizador, updateAnalizador, deleteAnalizador } = require("../controllers/analizador");

const router = Router();
router.get("/:id", validarJWT, esAdminRole, );
router.get("/", [validarJWT, tieneRole],getAnalizador);
router.post("/", [validarJWT, esAdminRole],createAnalizador);
router.put("/:id", [validarJWT, esAdminRole], updateAnalizador);
router.delete("/:id", [validarJWT, esAdminRole],deleteAnalizador);

module.exports = router;
