const { Router } = require("express");
const validator = require('ecuador-validator');
const { validarJWT } = require("../middleware/validar-jwt");
const { esAdminRole, tieneRole } = require("../middleware/validar-roles");

const { DeleteCotizacion, UpdateCotizacion, postCotizacion, consultaCotizacion } = require("../controllers/cotizacion");
const { check } = require("express-validator");
const { isEmpty } = require("lodash");
const { validarCampos } = require("../middleware/validar-campos");

const router = Router();
router.get("/:id", validarJWT, esAdminRole, );
router.get("/", [validarJWT, tieneRole],consultaCotizacion);
router.post("/", validarJWT, esAdminRole,[
check("RUC", "El RUC es obligatorio").not().isEmpty(),
validarCampos
],

    
    
    
    
    postCotizacion);
router.put("/:id", [validarJWT, esAdminRole], UpdateCotizacion);
router.delete("/:id", [validarJWT, esAdminRole],DeleteCotizacion);

module.exports = router;