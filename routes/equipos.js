const { Router } = require("express");

const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");
const { getEquipos, createEquipos, updateEquipos, deleteEquipos } = require("../controllers/equipos");

const router = Router();
router.get("/:id", validarJWT, esAdminRole, );
router.get("/", [validarJWT, esAdminRole],getEquipos);
router.post("/", [validarJWT, esAdminRole],createEquipos);
router.put("/:id", [validarJWT, esAdminRole], updateEquipos);
router.delete("/:id", [validarJWT, esAdminRole],deleteEquipos);

module.exports = router;
