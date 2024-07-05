const { Router } = require("express");
const {
	modalidadDelete,
	modalidadUpdate,
	postmodalidad,
	consultamodalidad,
} = require("../controllers/modalidad");

const router = Router();

router.get("/", consultamodalidad);
router.post("/", postmodalidad);
router.put("/:id", modalidadUpdate);
router.delete("/:id", modalidadDelete);

module.exports = router;