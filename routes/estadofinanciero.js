const { Router } = require("express");
const {
	contratoDelete,
	contratoUpdate,
	postcontrato,
	consultacontrato,
} = require("../controllers/contrato");

const router = Router();

router.get("/", consultacontrato);
router.post("/", postcontrato);
router.put("/:id", contratoUpdate);
router.delete("/:id", contratoDelete);

module.exports = router;