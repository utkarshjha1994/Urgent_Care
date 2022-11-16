const { getTests, modifyTests, updateLabTechProfile } = require("./labtech.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkUser } = require("../../auth/user_validation");

router.get("/getTests", checkToken, checkUser(["ROLE.LABTECH"]), getTests); 
router.put("/modifyTests", checkToken, checkUser(["ROLE.LABTECH"]), modifyTests); 
router.patch("/updateLabTechProfile", checkToken, checkUser(["ROLE.LABTECH"]), updateLabTechProfile); 

module.exports = router;