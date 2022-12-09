const db = require("../../config/DBconnection");

module.exports = {
    viewDoctors: callBack => {
        db.query("SELECT doctor_id, doctor_name, doctor_gender, doctor_speciality, doctor_address FROM doctors where doctor_estatus = ?",
        [
            "Active"
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    viewDoctorsBySpecialty: (data, callBack) => {
        console.log(data.doctor_speciality)
        db.query("SELECT doctor_id, doctor_name, doctor_gender, doctor_speciality FROM doctors where doctor_estatus = ? and doctor_speciality = ?",
        [
            "Active",
            data.doctor_speciality
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    checkIfEmailExists: (data, callBack) => {
        //can lookup in UCusers table too
        db.query('SELECT patient_email from patients where patient_email=?',  
        [
            data.email
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    createUser: (data, callBack) => {
        db.query('INSERT INTO patients(patient_name,patient_email,patient_password,patient_username,patient_gender,patient_dob,patient_phone,patient_address) values(?,?,?,?,?,?,?,?)', 
        [
            data.name,
            data.email,
            data.password,
            data.email,
            data.patient_gender,
            data.patient_dob,
            data.patient_phone,
            data.patient_address
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            else{
                db.query('INSERT INTO UCusers(username,email,password,user_role) values(?,?,?,?)', 
                [
                    data.email,
                    data.email,
                    data.password,
                    "ROLE.PATIENT"
                ],
                (error, results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    //return callBack(null, results);
                });
                return callBack(null, results);
            }
            //return callBack(null, results);
        });
    },
    getUserByEmail: (email, callBack) => {
        db.query("SELECT * FROM UCusers where email=?",
        [
            email
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results); //get user_role from here
            return callBack(null, results[0]);
        });
    },
    getPatient: (email, callBack) => {
        db.query("SELECT * FROM patients where patient_email=?",
        [
            email
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results); //role also included
            return callBack(null, results[0]);
        });
    },
    getDoctor: (email, callBack) => {
        db.query("SELECT * FROM doctors where doctor_email=? and doctor_estatus=?",
        [
            email,
            "Active"
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results); //role also included
            return callBack(null, results[0]);
        });
    },
    getLabTechs: (email, callBack) => {
        db.query("SELECT * FROM labtechs where labtech_email=? and labtech_estatus=?",
        [
            email,
            "Active"
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results); //role also included
            return callBack(null, results[0]);
        });
    },
    getUserDetailsFromDB: (data, callBack) => {
        db.query("SELECT patient_gender, patient_dob, patient_phone, patient_address, patient_insuranceNo FROM patients where patient_id=?",
        [
            data.patient_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    changePassword: (data, callBack) => {
        db.query("UPDATE patients SET patient_password=? where patient_id=?",
        [
            data.password,
            data.patient_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            else{
                //unable to update email-id here because no unique key present to reference it, maybe use patient_id as foreign key
                //so insert new email as a "new-user in user table"
                //when logging in, we look into UCusers table to just verify a email-pwd combination exists or not.
                db.query('SELECT email from UCusers WHERE email=?',
                [
                    data.email
                ],
                (error, results, fields) => {
                    if(results.length == 0){
                        db.query("INSERT INTO UCusers(username,email,password,user_role) values(?,?,?,?)",
                        [
                            data.email,
                            data.email,
                            data.password,
                            "ROLE.PATIENT"
                        ],
                        (error, results, fields) => {
                            if(error){
                                return callBack(error);
                            }
                            return callBack(null, results);
                        });
                    }
                    else if(results.length !== 0){
                        db.query("UPDATE UCusers SET password=? where email=?",
                        [
                            data.password,
                            data.email
                        ],
                        (error, results, fields) => {
                            if(error){
                                return callBack(error);
                            }
                            return callBack(null, results);
                        });
                    }
                });
            }
        });
    },
    updatePatientProfile: (data, callBack) => {
        db.query("UPDATE patients SET patient_gender=?, patient_dob=?, patient_phone=?, patient_address=?, patient_insuranceNo=?  where patient_id=?",
        [
            data.patient_gender,
            data.patient_dob,
            data.patient_phone,
            data.patient_address,
            data.patient_insuranceNo,
            data.patient_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            else{
                console.log(results);
                return callBack(null, results);
            };
                //return callBack(null, results);
        });
    },
    viewAvailableAppointments: (data, callBack) => {
        db.query('SELECT slots FROM appointments WHERE doctor_id = ? AND appt_date = ? ',
        [
            data.doctor_id,
            data.appt_date
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    bookAppointment: (data, callBack) => {

        //blank space validation
        x = data.insuranceNo.trim()
        console.log(x)
        if(!data.insuranceNo || x==""){
            results1 = {"results":"Appointment Fees"}
            
                results1.appointment_fees = data.charges;
                results1.insurance_coverage = 0+"%";
                results1.total_charges = data.charges;
                console.log(results1)
            
            return callBack(null, results1);
                
        }
        else{
            db.query('SELECT * FROM insuranceNW WHERE insurance_company = ? AND coverage_description = ?',
            [
                data.insurance_company,
                data.description //doctor_speciality
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                else{
                    console.log(results[0]);
                    //total_charges = data.charges - results[0].coverage_amount;
                    //insurance covergae is in %
                    total_charges =  Number(data.charges) - (( Number(results[0].coverage_amount)* Number(data.charges))/100);

                    let insurance_coverage = results[0].coverage_amount+"%";
                    let total_charges_after_insurance_coverage = total_charges;
                    console.log(data.charges);
                    console.log(insurance_coverage);
                    console.log(total_charges_after_insurance_coverage);

                    results[0].appointment_fees = data.charges;
                    results[0].insurance_coverage = insurance_coverage;
                    results[0].total_charges = total_charges_after_insurance_coverage;
                    results = results[0];

                    return callBack(null, results);
                }
            });
        }
        
    },
    makePayment: (data, callBack) => {
        //this is for when booking appointment
        //frontend sends the data calculated after hitting the bookAppt API
        //if no insurance number available with user, then send full charges under final_charges field in request body
        console.log(data)
        db.query('INSERT INTO appointments(appt_date,patient_id,doctor_id,total_payment,pending_payment,slots) values(?,?,?,?,?,?)', 
        [
            data.appt_date,
            data.patient_id,
            data.doctor_id,
            data.final_charges,
            0,
            data.slots
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            else{
                db.query('SELECT appointments.appt_id, appointments.appt_date, appointments.slots, patients.patient_phone FROM appointments INNER JOIN patients ON appointments.patient_id=patients.patient_id where appointments.patient_id=? ORDER BY appointments.appt_id DESC LIMIT 1', 
                [
                    data.patient_id
                ],
                (error, results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null, results);
                });
            }
            //return callBack(null, results);
        });
        //return callBack(null, results);   
    },
    viewDueCharges: (data, callBack) => {
        //want to return just the charges

        //blank space validation
        x = data.insuranceNo.trim()
        console.log(x)
        if(!data.insuranceNo || x==""){
            console.log("Insurance number not available!");
            db.query("SELECT pending_payment FROM appointments where appt_id=?",
            [
                data.appt_id
            ],
            (error, results1, fields) => {
                if(error){
                    return callBack(error);
                }
                else{
                    console.log("Hi",results1);
                    console.log(results1[0]); //pending payment
                    results1[0].total_charges = results1[0].pending_payment;

                    return callBack(null, results1[0]);
                }
                
            });
        }

        else{
            db.query('SELECT * FROM insuranceNW where insurance_company = ? AND coverage_description = ?',
            [
                data.insurance_company,
                data.description //test_name
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                else{
                    db.query("SELECT pending_payment FROM appointments where appt_id=?",
                    [
                        data.appt_id
                    ],
                    (error, results1, fields) => {
                        if(error){
                            return callBack(error);
                        }
                        else{
                            console.log("Hi",results);
                            console.log(results1[0]); //pending payment

                            total_charges = Number(results1[0].pending_payment) - ((Number(results[0].coverage_amount)*Number(results1[0].pending_payment))/100);

                            //total_charges = results1[0].pending_payment - results[0].coverage_amount;
                            console.log(total_charges); //amount they will pay after insurance coverage

                            let insurance_coverage = results[0].coverage_amount+"%";
                            console.log(insurance_coverage);
                            let total_charges_after_insurance_coverage = total_charges;
                            console.log(total_charges_after_insurance_coverage);

                            results1[0].insurance_coverage = insurance_coverage; //in %
                            results1[0].total_charges = total_charges_after_insurance_coverage;

                            return callBack(null, results1[0]);
                        }
                        
                    });
                    //return callBack(null, results);
                }
            });
        }
        
    },
    makeDuePayment: (data, callBack) => {
        //this is for when patient wants to clear his dues

        //frontend sends the data calculated after hitting the bookAppt API
        //if no insurance number available with user, then send full charges under final_charges field in request body
        
        db.query("SELECT pending_payment, total_payment FROM appointments where appt_id=?",
        [
            data.appt_id
        ],
        (error, results1, fields) => {
            if(error){
                return callBack(error);
            }
            else{
                console.log(results1[0]);//pending payment of user for an appointment and already paid amount for the appointment returned

                //frontend sends the data calculated after hitting the bookAppt API
                //if no insurance number available with user, then send full charges under final_charges field in request body
                let total_charges = data.paymentValue; //will be fetched from request body
                console.log(total_charges);

                total_payment = results1[0].total_payment;
                console.log(total_payment);
                
                let final_total_payment = Number(total_payment) +  Number(total_charges);
                console.log(final_total_payment);
                db.query('UPDATE appointments SET total_payment=?, pending_payment=? WHERE appt_id=?', 
                [
                    final_total_payment,
                    0, //assuming that patient pays full pending amount, if not then can get another field from frontend mentioning amount paid
                    data.appt_id
                ],
                (error, results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null, results);
                });
                //return callBack(null, results1[0]);
            }
            
        });
       
    },
    viewAppointment: (data, callBack) => {
        db.query("SELECT appointments.*, doctors.doctor_name, doctors.doctor_gender, doctors.doctor_email, doctors.doctor_phone, doctors.doctor_speciality, patients.* FROM appointments INNER JOIN doctors ON appointments.doctor_id=doctors.doctor_id INNER JOIN patients ON appointments.patient_id=patients.patient_id where appointments.patient_id=?",
        [
            data.patient_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    modifyAppointment: (data, callBack) => {
        db.query("UPDATE appointments SET appt_date=? where appt_id=?",
        [
            data.appt_date,
            data.appt_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deleteAppointment: (data, callBack) => {
        db.query("DELETE FROM appointments WHERE appt_id=?",
        [
            data.appt_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    }
}