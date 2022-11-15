const { checkIfDoctorEmailExists, addDoctor, checkIfAdminEmailExists, addAdmin, checkIfLabTechEmailExists, addLabTech, deactivateDoctor, deactivateLabTech, updateAdminProfile, viewPatients, viewDoctors, viewLabTechs, bookAppointment, modifyAppointment } = require("./admin.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    addDoctor: (req, res) => {
        const body = req.body; //name,email,password,confirm password fields from register page
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        if( !body.name || !body.email || !body.password || !body.passwordConfirm || !body.gender || !body.dob || !body.phone || !body.address || !body.speciality ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to register!',
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
        else if(body.password.length >= 12 && body.password.length <= 8){
            return res.status(500).json({
                message: 'Password must be atleast 8 characters and at most 12 characters!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt); //hash the password
            checkIfDoctorEmailExists(body, (err,results) => {
                if(results.length !== 0){
                    return res.status(500).json({
                        success: 0,
                        message: "Email already Exists!"
                    });
                }
                else if(results.length == 0){
                    addDoctor(body, (err, results) => {
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
                        else{
                            return res.status(200).json({
                                success: 1,
                                data: results,
                                message: "Doctor Registered"
                            });
                        } 
                    });
                }
            });
        } 
    },
    addAdmin: (req, res) => {
        const body = req.body; //email,password,confirm password fields from register page
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        if( !body ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to register!',
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
        else if(body.password.length >= 12 && body.password.length <= 8){
            return res.status(500).json({
                message: 'Password must be atleast 8 characters and at most 12 characters!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt); //hash the password
            checkIfAdminEmailExists(body, (err,results) => {
                if(results.length !== 0){
                    return res.status(500).json({
                        success: 0,
                        message: "Email already Exists!"
                    });
                }
                else if(results.length == 0){
                    addAdmin(body, (err, results) => {
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
                        else{
                            return res.status(200).json({
                                success: 1,
                                data: results,
                                message: "Administrator Registered"
                            });
                        } 
                    });
                }
            });
        }
    },
    addLabTech: (req, res) => {
        const body = req.body; //name,email,password,confirm password fields from register page
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        if( !body.name || !body.email || !body.password || !body.passwordConfirm || !body.gender || !body.dob || !body.phone || !body.address || !body.speciality ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to register!',
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
        else if(body.password.length >= 12 && body.password.length <= 8){
            return res.status(500).json({
                message: 'Password must be atleast 8 characters and at most 12 characters!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt); //hash the password
            checkIfLabTechEmailExists(body, (err,results) => {
                if(results.length !== 0){
                    return res.status(500).json({
                        success: 0,
                        message: "Email already Exists!"
                    });
                }
                else if(results.length == 0){
                    addLabTech(body, (err, results) => {
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
                        else{
                            return res.status(200).json({
                                success: 1,
                                data: results,
                                message: "Lab Technician Registered"
                            });
                        } 
                    });
                }
            });
        } 
    },
    deactivateDoctor: (req, res) => {
        const body = req.body; //doctor_id
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        if( !body.doctor_id ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to deactivate User!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            deactivateDoctor(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Internal Server Error"
                    });
                }
                else{
                    return res.status(200).json({
                        success: 1,
                        data: results,
                        message: "Doctor Deactivated!"
                    });
                } 
            });
                
        } 
    },
    deactivateLabTech: (req, res) => {
        const body = req.body; //labtech_id
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        if( !body.labtech_id ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to deactivate User!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            deactivateLabTech(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Internal Server Error"
                    });
                }
                else{
                    return res.status(200).json({
                        success: 1,
                        data: results,
                        message: "Lab Technician Deactivated!"
                    });
                } 
            });
                
        } 
    },
    updateAdminProfile: (req, res) => {
        const body = req.body; //name,email,password,confirm password fields from register page
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        if( !body.email || !body.password || !body.passwordConfirm ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to update profile!',
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
        else if(body.password.length >= 12 && body.password.length <= 8){
            return res.status(500).json({
                message: 'Password must be atleast 8 characters and at most 12 characters!',
                name: body.name,
                email: body.email //send form data back
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt); //hash the password
            checkIfAdminEmailExists(body, (err,results) => {
                if(results.length !== 0){
                    return res.status(500).json({
                        success: 0,
                        message: "Email already Exists!"
                    });
                }
                else if(results.length == 0){
                    updateAdminProfile(body, (err, results) => {
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
                        else{
                            return res.status(200).json({
                                success: 1,
                                data: results,
                                message: "Administrator records Updated"
                            });
                        } 
                    });
                }
            });
        } 
    },
    viewPatients: (req,res) => {
        viewPatients((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    viewDoctors: (req,res) => {
        viewDoctors((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    viewLabTechs: (req,res) => {
        viewLabTechs((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    bookAppointment: (req,res) => {
        let body = req.body; //get appt_date, charges, patient_id, doctor_id, insuranceNo, speciality
        //our insuranceNo for all users will be of pattern ABC-XXXXXX
        //we get the first 3 letters of insuranceNo and compare if we have that insurance company in our InsuranceNW table in DB
        //if user has an insurance with an insurance company ABC, and our Urgent care falls into the ABC insurance network then 
        //lookup procedure columns (fmp_physician,imp_physician,smp_physician,emp_physician) to see rebates and deduct it from charges
        //fmp --> family medicine physician
        //imp --> internal medicine physician
        //smp --> sports medicine physician
        //emp --> emergency medicine physician

        //if our Urgent care does not fall into any insurance network then totalPayment = charges i.e., full charge (no rebate)

        let charges = body.charges;
        console.log(charges);
        let insurance_company = body.insuranceNo.substring(0,3);
        console.log(insurance_company);
        req.body.insurance_company = insurance_company;
        body = req.body;
        console.log(body);

        bookAppointment(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            else{
                return res.status(200).json({
                    success: 1,
                    data: results,
                    message: "Appointment Booked"
                });
            } 
        });
    },
    modifyAppointment: (req, res) => {
        const body = req.body; //get new appt_date from user and appt_id
        modifyAppointment(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "Failed to Update Appointment!"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Appointment Modified Successfully!"
            });
        });
    }
}