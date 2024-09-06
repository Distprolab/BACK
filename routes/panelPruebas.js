const { Router } = require("express");

const { consultaroles, createroles } = require("../controllers/roles");
const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole } = require("../middleware/validar-roles");
const {
  createpanelPruebas,
  getpanelPruebas,
  deletepanelPruebas,
  getIdpruebas,
  updatepanelPruebas,
} = require("../controllers/panelPruebas");

const router = Router();

router.get("/", validarJWT, esAdminRole, getpanelPruebas);
router.get("/:id", validarJWT, esAdminRole, getIdpruebas);
router.post("/", validarJWT, esAdminRole, createpanelPruebas);
router.put("/:id", validarJWT, esAdminRole, updatepanelPruebas);
router.delete('/:id',validarJWT, esAdminRole,deletepanelPruebas );
/* 

router.put('/:id',usuariosUpdate );

router.post('/',usuariosPost );

router.delete('/:id',usuariosDelete );
 */

module.exports = router;
