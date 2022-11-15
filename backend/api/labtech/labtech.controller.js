const { getTests, modifyTests, updateLabTechProfile } = require("./labtech.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    getTests: (req, res) => {
        const body = req.body; //test_status=pending
        getTests(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                mesage: "List of pending tests"
            });
        });
    },
    modifyTests: (req, res) => {
        const body = req.body; //appt_id
        modifyTests(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                mesage: "Test Results Updated"
            });
        });
    },
    updateLabTechProfile: (req, res) => {
        const body = req.body; //body will have all doctor details including name,email,password,confirm password from update Profile HTML page
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        
        if( !body.name || !body.email || !body.password || !body.passwordConfirm ){ //Necessary fields, cannot update NULL fields to DB, These fields should be populated initially!
            return res.status(500).json({
                message: 'You cannot leave out name,email and password fields empty!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else if(body.password.length >= 12 && body.password.length <= 8){
            return res.status(500).json({
                message: 'Password must be atleast 8 characters and atmost 12 characters!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else if( body.password !== body.passwordConfirm ){
            return res.status(500).json({
                message: 'Password and Confirm Password Fields Do Not Match!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            updateLabTechProfile(body, (err, results) => {
                if(err){
                    console.log(err);
                    if(err.code == "ER_DUP_ENTRY"){
                        return res.status(500).json({
                            success: 0,
                            message: "Email already Exists!"
                        });
                    }
                    else{
                        return res.status(500).json({
                            success: 0,
                            message: "Internal Server Error"
                        });
                    }
                }
                if(!results){
                    return res.status(500).json({
                        success: 0,
                        message: "Failed to Update User!"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "LabTech Record Updated Successfully!"
                });
            });
        }
    }
}