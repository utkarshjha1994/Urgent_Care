const { viewDoctors, createUser, login, updatePatientProfile, bookAppointment, makePayment, viewDueCharges, makeDuePayment, viewAppointment, modifyAppointment, deleteAppointment, logout } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkUser } = require("../../auth/user_validation")

router.get("/viewDoctors", viewDoctors);
router.post("/patientRegister",createUser);
router.post("/login",login);
router.patch("/updatePatientProfile", checkToken, checkUser(["ROLE.PATIENT"]), updatePatientProfile);
router.post("/bookAppt", checkToken, checkUser(["ROLE.PATIENT"]), bookAppointment);
router.post("/makePayment", checkToken, checkUser(["ROLE.PATIENT"]), makePayment);
router.post("/viewDueCharges", checkToken, checkUser(["ROLE.PATIENT"]), viewDueCharges);
router.post("/makeDuePayment", checkToken, checkUser(["ROLE.PATIENT"]), makeDuePayment);
router.get("/viewAppt", checkToken, checkUser(["ROLE.PATIENT"]), viewAppointment);
router.patch("/modifyAppt", checkToken, checkUser(["ROLE.PATIENT"]), modifyAppointment);
router.delete("/deleteAppt", checkToken, checkUser(["ROLE.PATIENT"]), deleteAppointment);
router.get("/logout",logout);


module.exports = router;
