const { Router } = require("express");

const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../middleware/validar-roles");
const { getEquipos, createEquipos, updateEquipos, deleteEquipos, GetIdEquipos, GetfiltroEquipo } = require("../controllers/equipos");

const router = Router();
router.get("/:id", validarJWT, tieneRole, GetIdEquipos);
router.get("/", getEquipos);
router.get(
    "/busquedaequipo/:busquedaequipo",
    [validarJWT, tieneRole],
    GetfiltroEquipo,
  );
router.post("/", [validarJWT, esAdminRole],createEquipos);
router.put("/:id", [validarJWT, esAdminRole], updateEquipos);
router.delete("/:id", [validarJWT, esAdminRole],deleteEquipos);

module.exports = router;
