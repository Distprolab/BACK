const { Router } = require("express");
const { mail, estadic } = require("../controllers/mail");

const router = Router();

router.post("/", mail);
router.get("/", estadic);

module.exports = router;
