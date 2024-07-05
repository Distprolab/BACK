const { Router } = require("express");
const {
	reparacionDelete,
	reparacionUpdate,
	postreparacion,
	consultareparacion,
} = require("../controllers/reparacion");

const router = Router();

router.get("/", consultareparacion);
router.post("/", postreparacion);
router.put("/:id", reparacionUpdate);
router.delete("/:id", reparacionDelete);

module.exports = router;