const { Router } = require("express");
const { consultaestado, postestado, estadoUpdate, estadoDelete } = require("../controllers/estado");


const router = Router();

router.get("/", consultaestado);
router.post("/", postestado);
router.put("/:id", estadoUpdate);
router.delete("/:id", estadoDelete);

module.exports = router;