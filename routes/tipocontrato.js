const { Router } = require("express");
const { tipoContratoDelete, tipoContratoUpdate, posttipoContrato, consultatipoContrato } = require("../controllers/tipocontrato");


const router = Router();

router.get("/", consultatipoContrato);
router.post("/", posttipoContrato);
router.put("/:id", tipoContratoUpdate);
router.delete("/:id", tipoContratoDelete);

module.exports = router;