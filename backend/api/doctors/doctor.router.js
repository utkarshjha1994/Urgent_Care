const { updateDoctorProfile, viewDocAppointment, addDiagnosis, getMyPatientsApptHistory, getAllMyPatients } = require("./doctor.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkUser } = require("../../auth/user_validation");

router.patch("/updateDoctorProfile", checkToken, checkUser(["ROLE.DOCTOR"]), updateDoctorProfile); 
router.get("/viewDocAppt", checkToken, checkUser(["ROLE.DOCTOR"]), viewDocAppointment);
router.put("/addDiagnosis", checkToken, checkUser(["ROLE.DOCTOR"]), addDiagnosis);
router.get("/getAllMyPatients", checkToken, checkUser(["ROLE.DOCTOR"]), getAllMyPatients);
router.get("/getMyPatientsApptHistory", checkToken, checkUser(["ROLE.DOCTOR"]), getMyPatientsApptHistory); 

module.exports = router;