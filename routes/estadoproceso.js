const { Router } = require("express");
const { postestadoProceso, updateestadoProceso } = require("../controllers/estadoproceso");


const router = Router();

//router.get("/", postestadoProceso);
router.post("/", postestadoProceso);
router.put("/:PROCESO_ID", updateestadoProceso);
//router.delete("/:id", estadoPrcoesoDelete);

module.exports = router;