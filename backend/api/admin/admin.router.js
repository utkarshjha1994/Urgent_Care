const { addDoctor, addAdmin, addLabTech, deactivateDoctor, deactivateLabTech, updateAdminProfile, viewPatients, viewDoctors, viewLabTechs, bookAppointment, modifyAppointment } = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkUser } = require("../../auth/user_validation")

router.post("/addDoctor", checkToken, checkUser(["ROLE.ADMIN"]), addDoctor); 
router.post("/addAdmin", checkToken, checkUser(["ROLE.ADMIN"]), addAdmin); 
router.post("/addLabTech", checkToken, checkUser(["ROLE.ADMIN"]), addLabTech); 
router.patch("/deactivateDoctor", checkToken, checkUser(["ROLE.ADMIN"]), deactivateDoctor); 
router.patch("/deactivateLabTech", checkToken, checkUser(["ROLE.ADMIN"]), deactivateLabTech); 
router.patch("/updateAdminProfile", checkToken, checkUser(["ROLE.ADMIN"]), updateAdminProfile);
router.post("/viewPatients", checkToken, checkUser(["ROLE.ADMIN"]), viewPatients);
router.post("/viewDoctors", checkToken, checkUser(["ROLE.ADMIN"]), viewDoctors);
router.post("/viewLabTechs", checkToken, checkUser(["ROLE.ADMIN"]), viewLabTechs);
router.post("/bookApptAdmin", checkToken, checkUser(["ROLE.ADMIN"]), bookAppointment);
router.post("/modifyApptAdmin", checkToken, checkUser(["ROLE.ADMIN"]), modifyAppointment);


module.exports = router;