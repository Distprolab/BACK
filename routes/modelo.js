const { Router } = require("express");
const {
	modeloDelete,
	modeloUpdate,
	postmodelo,
	consultamodelo,
} = require("../controllers/modelo");

const router = Router();

router.get("/", consultamodelo);
router.post("/", postmodelo);
router.put("/:id", modeloUpdate);
router.delete("/:id", modeloDelete);

module.exports = router;