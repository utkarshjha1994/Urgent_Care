const { viewDoctors, viewDoctorsBySpecialty, createUser, login, updatePatientProfile, changePassword, viewAvailableAppointments, bookAppointment, makePayment, viewDueCharges, makeDuePayment, viewAppointment, modifyAppointment, deleteAppointment, logout } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkUser } = require("../../auth/user_validation")

router.get("/viewDoctors", viewDoctors);
router.get("/viewDoctorsBySpecialty", viewDoctorsBySpecialty);
router.post("/patientRegister",createUser);
router.post("/login",login);
router.patch("/changePassword", checkToken, checkUser(["ROLE.PATIENT"]),changePassword);
router.patch("/updatePatientProfile", checkToken, checkUser(["ROLE.PATIENT"]), updatePatientProfile);
router.get("/viewAvailableAppointments", checkToken, checkUser(["ROLE.PATIENT"]), viewAvailableAppointments);
router.get("/bookAppt", checkToken, checkUser(["ROLE.PATIENT"]), bookAppointment);
router.post("/makePayment", checkToken, checkUser(["ROLE.PATIENT"]), makePayment);
router.get("/viewDueCharges", checkToken, checkUser(["ROLE.PATIENT"]), viewDueCharges);
router.post("/makeDuePayment", checkToken, checkUser(["ROLE.PATIENT"]), makeDuePayment);
router.get("/viewAppt", checkToken, checkUser(["ROLE.PATIENT"]), viewAppointment);
router.patch("/modifyAppt", checkToken, checkUser(["ROLE.PATIENT"]), modifyAppointment);
router.delete("/deleteAppt", checkToken, checkUser(["ROLE.PATIENT"]), deleteAppointment);
router.get("/logout", checkToken,logout);


module.exports = router;
