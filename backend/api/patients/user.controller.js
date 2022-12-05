const { viewDoctors, viewDoctorsBySpecialty, createUser, checkIfEmailExists, getUserByEmail, getPatient, getDoctor, getLabTechs, getUserDetailsFromDB, changePassword, updatePatientProfile, viewAvailableAppointments, bookAppointment, makePayment, viewDueCharges, makeDuePayment, viewAppointment, modifyAppointment, deleteAppointment } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    viewDoctors: (req, res) => {
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
    viewDoctorsBySpecialty: (req, res) => {
        const body = req.body;
        //console.log(body)
        viewDoctorsBySpecialty(body,(err, results) => {
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
    createUser: (req, res) => {
        const body = req.body; //name,email,password,confirm password fields from register page
        //Validate fields [Server-side validation]
        //Are fields empty?, if so, send relevant message to client
        console.log(body.password.length);
        if( !body.name || !body.email || !body.password || !body.passwordConfirm || !body.patient_address || !body.patient_dob || !body.patient_gender || !body.patient_phone ){
            return res.status(500).json({
                message: 'Please fill all the fields in order to register!',
                //send form data back
                name: body.name,
                email: body.email, 
                patient_address: body.patient_address,
                patient_dob: body.patient_dob,
                patient_gender: body.patient_gender,
                patient_phone: body.patient_phone
            });
        }
        else if( body.password !== body.passwordConfirm ){
            return res.status(500).json({
                message: 'Password and Confirm Password Fields Do Not Match!',
                //send form data back
                name: body.name,
                email: body.email, 
                patient_address: body.patient_address,
                patient_dob: body.patient_dob,
                patient_gender: body.patient_gender,
                patient_phone: body.patient_phone
            });
        }
        
        else if(body.password.length > 12 || body.password.length < 8){
            console.log(body.password.length);
            return res.status(500).json({
                message: 'Password must be atleast 8 characters and at most 12 characters!',
                //send form data back
                name: body.name,
                email: body.email, 
                patient_address: body.patient_address,
                patient_dob: body.patient_dob,
                patient_gender: body.patient_gender,
                patient_phone: body.patient_phone
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt); //hash the password
            checkIfEmailExists(body, (err,results) => {
                if(results.length !== 0){
                    return res.status(500).json({
                        success: 0,
                        message: "Email already Exists!"
                    });
                }
                else if(results.length == 0){
                    createUser(body, (err, results) => {
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
                                message: "Patient Registered"
                            });
                        } 
                    });
                }
            });
        } 
    },
    login: (req, res) => {
        const body = req.body; //username/email (both have same values in DB, BUT we should ask for email while Login!) and password
        //if user tries to login with old email id, it will give a successfull login, but it won't be fetching user details
        //so frontend should prompt that user should login with new email id, which was updated by them!
        getUserByEmail(body.email, (err,results) => { //to get user role
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection error"
                });
            }
            else if(!results){
                return res.status(500).json({
                    success: 0,
                    message: "User Not Found!"
                });
            }
            else{
                const result = compareSync(body.password, results.password);
                if(result) {
                    results.password = undefined; //don't want to send password in jwt
                    const jsonwebtoken = sign(
                    {
                        result: results
                    }, 
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });
                    //create cookie
                    const cookieOptions = {
                        expiresIn: new Date(
                            //convert to milliseconds
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    }

                    //put cookie in browser
                    res.cookie('jwt', jsonwebtoken, cookieOptions);

                    //console.log(results.user_role);
                    //Now, get logged-in user's details from respective tables as per user_role
                    if(results.user_role == "ROLE.PATIENT"){
                        getPatient(results.email, (err,results2) => { //to get user
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
                                    message: "Login Successful",
                                    token: jsonwebtoken,
                                    userRole: results.user_role, //pass role from DB to JSON struct
                                    user: results2,
                                    image: "https://www.nicepng.com/png/full/128-1280406_user-icon-png.png" //insert user image
                                });
                            }
                        });
                    }
                    //else if ROLE.ADMIN,ROLE.DOCTOR,ROLE.LABTECH
                    else if(results.user_role == "ROLE.DOCTOR"){
                        getDoctor(results.email, (err,results2) => { //to get user
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
                                    message: "Login Successful",
                                    token: jsonwebtoken,
                                    userRole: results.user_role, //pass role from DB to JSON struct
                                    user: results2
                                });
                            }
                        });
                    }
                    else if(results.user_role == "ROLE.LABTECH"){
                        getLabTechs(results.email, (err,results2) => { //to get user
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
                                    message: "Login Successful",
                                    token: jsonwebtoken,
                                    userRole: results.user_role, //pass role from DB to JSON struct
                                    user: results2
                                });
                            }
                        });
                    }
                    else if(results.user_role == "ROLE.ADMIN"){
                        return res.status(200).json({
                            success: 1,
                            message: "Login Successful",
                            token: jsonwebtoken,
                            userRole: results.user_role, //pass role from DB to JSON struct
                            user: results //can get admin ID,name,password,email from here (can get user_role from here too)
                        });
                    }
                }
                else{
                    return res.status(500).json({
                        success: 0,
                        message: "Invalid Email or Password" //Well, here password entered by User does not match with DB, but we shouldn't tell them whether email or password is incorrect
                    });
                }
            }
        });
    },
    updatePatientProfile: (req, res) => {
        const body = req.body; 
        //server side validation for whether data is null, if null then fetch data from DB and store the same again

        if( !body.patient_gender && !body.patient_dob && !body.patient_phone && !body.patient_address && !body.patient_insuranceNo ){ 
            getUserDetailsFromDB(body, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Internal Server Error"
                    });
                }
                else{
                    combo = results[0]
                    //console.log("hi",combo)
                    updatePatientProfile(combo, (err, results) => {
                        if(err){
                            console.log(err);
                            if(err.code == "ER_DUP_ENTRY"){ //Not required now!
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
                            message: "User Updated Successfully!",
                            result: results,
                            data: combo
                        });
                    });
                }
            });
        }
        else if( body.patient_gender && body.patient_dob && body.patient_phone && body.patient_address || body.patient_insuranceNo ){
            //insuranceNo can be optional
            console.log("Hi")
            updatePatientProfile(body, (err, results) => {
                if(err){
                    console.log(err);
                    if(err.code == "ER_DUP_ENTRY"){ //Not required now!
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
                    message: "User Updated Successfully!",
                    result: results,
                    data: body
                });
            });       
        }
    },
    changePassword: (req, res) => {
        const body = req.body; //body must have patient_id, email, password, confirm password fields (email field preferred to be uneditable)

        if(!body.password || !body.passwordConfirm ){
            return res.status(500).json({
                success: '0',
                message: 'You cannot leave out password fields empty!',
            });
        }
        else if(body.password.length > 12 || body.password.length < 8){
            return res.status(500).json({
                success: '0',
                message: 'Password must be atleast 8 characters and atmost 12 characters!'
            });
        }
        else if( body.password !== body.passwordConfirm ){
            return res.status(500).json({
                success: '0',
                message: 'Password and Confirm Password Fields Do Not Match!'
            });
        }
        else{
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            console.log(body)
            changePassword(body, (err, results) => {
                //console.log("hi",combo)
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
                    message: "Password Updated Successfully!",
                    result: body
                });
            });
        }
    },
    viewAvailableAppointments: (req, res) => {
        const body = req.body;
        viewAvailableAppointments(body,(err, results) => {
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
                message: "Available Appointment Slots"
            });
        });
    },
    bookAppointment: (req, res) => {
        let body = req.body; //get appt_date, charges, patient_id, doctor_id, insuranceNo, speciality
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
                    message: "Appointment Fees"
                });
            } 
        });
    },
    makePayment: (req, res) => {
        let body = req.body; //get appt_date, charges, patient_id, doctor_id, insuranceNo, speciality, appt_id
        //our insuranceNo for all users will be of pattern ABC-XXXXXX
        //we get the first 3 letters of insuranceNo and compare if we have that insurance company in our InsuranceNW table in DB
        //if user has an insurance with an insurance company ABC, and our Urgent care falls into the ABC insurance network then 
        //lookup procedure columns (fmp_physician,imp_physician,smp_physician,emp_physician) to see rebates and deduct it from charges
        //fmp --> family medicine physician
        //imp --> internal medicine physician
        //smp --> sports medicine physician
        //emp --> emergency medicine physician

        //if our Urgent care does not fall into any insurance network then totalPayment = charges i.e., full charge (no rebate)

        //only after make payment, appointment will be booked and inserted into DB!

        let charges = body.charges;
        console.log(charges);
        let insurance_company = body.insuranceNo.substring(0,3);
        console.log(insurance_company);
        req.body.insurance_company = insurance_company;
        body = req.body;
        console.log(body);

        makePayment(body, (err, results) => {
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
    viewDueCharges: (req, res) => {
        let body = req.body; //get appt_id, insuranceNo, test_name
        let insurance_company = body.insuranceNo.substring(0,3);
        console.log(insurance_company);
        req.body.insurance_company = insurance_company;
        body = req.body;
        console.log(body);

        viewDueCharges(body, (err, results) => {
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
                    message: "Amount Due"
                });
            } 
        });
    },
    makeDuePayment: (req, res) => {
        let body = req.body; //get appt_id, insuranceNo, test_name

        let pending_payment = body.pending_payment;
        console.log(pending_payment);
        let insurance_company = body.insuranceNo.substring(0,3);
        console.log(insurance_company);
        req.body.insurance_company = insurance_company;
        body = req.body;
        console.log(body);

        makeDuePayment(body, (err, results) => {
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
                    message: "Dues Cleared!"
                });
            } 
        });
    },
    viewAppointment: (req, res) => {
        const body = req.body;
        viewAppointment(body, (err, results) => {
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
    },
    deleteAppointment: (req, res) => {
        const body = req.body; //get appt_id from user 
        deleteAppointment(body, (err, results) => {
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
                    message: "Failed to Delete Appointment!"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Appointment Deleted Successfully!"
            });
        });
    },
    logout: (req, res) => {
        res.cookie('jwt', 'logout', {
            expires: new Date(Date.now() + 2*1000), //cookie removed after two seconds you press logout
            httpOnly: true
        });//overwrite current cookie
        return res.status(200).json({
            success: 1,
            message: "Logged out Successfully!"
        });
    }

}