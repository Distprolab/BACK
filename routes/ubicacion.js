const { Router } = require("express");
const { consultaubicacion, postubicacion, ubicacionUpdate, ubicacionDelete } = require("../controllers/ubicacion");


const router = Router();

router.get("/", consultaubicacion);
router.post("/", postubicacion);
router.put("/:id", ubicacionUpdate);
router.delete("/:id", ubicacionDelete);

module.exports = router;