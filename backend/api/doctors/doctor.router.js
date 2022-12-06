const { updateDoctorProfile, changePassword, viewDocAppointment, viewMyIndividualPatientsAppointments, addDiagnosis, getMyPatientsApptHistory, getAllMyPatients } = require("./doctor.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkUser } = require("../../auth/user_validation");

router.patch("/changePasswordDoc", checkToken, checkUser(["ROLE.DOCTOR"]),changePassword);
router.patch("/updateDoctorProfile", checkToken, checkUser(["ROLE.DOCTOR"]), updateDoctorProfile); 
router.post("/viewDocAppt", checkToken, checkUser(["ROLE.DOCTOR"]), viewDocAppointment);
router.put("/addDiagnosis", checkToken, checkUser(["ROLE.DOCTOR"]), addDiagnosis);
router.post("/getAllMyPatients", checkToken, checkUser(["ROLE.DOCTOR"]), getAllMyPatients);
router.post("/getMyPatientsApptHistory", checkToken, checkUser(["ROLE.DOCTOR"]), getMyPatientsApptHistory); 
router.post("/viewMyIndividualPatientsAppointments", checkToken, checkUser(["ROLE.DOCTOR"]), viewMyIndividualPatientsAppointments);

module.exports = router;