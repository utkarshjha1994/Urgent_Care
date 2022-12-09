const { updateDoctorProfile, getUserDetailsFromDB, changePassword, viewDocAppointment, viewMyIndividualPatientsAppointments, addDiagnosis, getMyPatientsApptHistory, getAllMyPatients } = require("./doctor.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
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
            //console.log(body)
            changePassword(body, (err, results) => {
                ////console.log("hi",combo)
                if(err){
                    //console.log(err);
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
    updateDoctorProfile: (req, res) => {
        const body = req.body; 
        //Validate fields [Server-side validation]
        //console.log("Hi",body)

        //phone validator
        //console.log(body.phone.length) 
        const isNumeric = (value) => {
            return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value);
          }
        isvalidphonenumber = isNumeric(body.phone)
        //console.log(isvalidphonenumber)

        if(!isvalidphonenumber){
            return res.status(500).json({
                message: 'Please enter Valid Phone Number!',
                //send form data back
                address: body.address,
                dob: body.dob,
                gender: body.gender,
                phone: body.phone
            });
        }

        if( !body.gender && !body.dob && !body.phone && !body.address && !body.speciality ){ 
            ////console.log("hi")
            getUserDetailsFromDB(body, (err, results) => {
                if(err){
                    //console.log(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Internal Server Error"
                    });
                }
                else{
                    combo = results[0]
                    //console.log("hi",combo)
                    updateDoctorProfile(combo, (err, results) => {
                        if(err){
                            //console.log(err);
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
                            message: "Doctor Updated Successfully!",
                            result: results,
                            data: combo
                        });
                    });
                }
            });
        }
        else if(  body.gender && body.dob && body.phone && body.address && body.speciality  ){
            //console.log("Hi")
            updateDoctorProfile(body, (err, results) => {
                if(err){
                    //console.log(err);
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
                    message: "Doctor Updated Successfully!",
                    result: results,
                    data: body
                });
            });       
        }

        
    },
    viewDocAppointment: (req, res) => {
        const body = req.body; //get doctor_id
        viewDocAppointment(body,(err, results) => {
            if(err){
                //console.log(err);
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
    addDiagnosis: (req, res) => {
        const body = req.body;
        //console.log(body)
        addDiagnosis(body,(err, results) => {
            if(err){
                //console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message:"Diagnosis Posted!"
            });
        });
    },
    getAllMyPatients: (req, res) => {
        const body = req.body; //get doctor_id
        getAllMyPatients(body,(err, results) => {
            if(err){
                //console.log(err);
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
    getMyPatientsApptHistory: (req, res) => {
        const body = req.body; //get doctor_id
        getMyPatientsApptHistory(body,(err, results) => {
            if(err){
                //console.log(err);
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
    viewMyIndividualPatientsAppointments: (req, res) => {
        const body = req.body;
        viewMyIndividualPatientsAppointments(body, (err, results) => {
            if(err){
                //console.log(err);
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
    }
}