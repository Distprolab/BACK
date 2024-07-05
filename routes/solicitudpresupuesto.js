const {Router}=require("express");
const { consultaSolicitudPresupuesto, postSolicitudPresupuesto, SolicitudPresupuestoUpdate, SolicitudPresupuestoDelete } = require("../controllers/solicitudpresupuesto");



const router =Router();

router.get("/",consultaSolicitudPresupuesto);
router.post("/",postSolicitudPresupuesto);
router.put("/:id",SolicitudPresupuestoUpdate);
router.delete("/:id",SolicitudPresupuestoDelete)


module.exports=router;