const db = require("../../config/DBconnection");

module.exports = {
    changePassword: (data, callBack) => {
        db.query("UPDATE doctors SET doctor_password=? where doctor_id=?",
        [
            data.password,
            data.doctor_id
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
                            "ROLE.DOCTOR"
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
    getUserDetailsFromDB: (data, callBack) => {
        db.query("SELECT doctor_gender, doctor_dob, doctor_phone, doctor_address, doctor_speciality FROM doctors where doctor_id=?",
        [
            data.doctor_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    updateDoctorProfile: (data, callBack) => {
        db.query("UPDATE doctors SET doctor_gender=?, doctor_dob=?, doctor_phone=?, doctor_address=?, doctor_speciality=?  where doctor_id=?",
        [
            data.gender,
            data.dob,
            data.phone,
            data.address,
            data.speciality,
            data.doctor_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            else{
                console.log(results);
                return callBack(null, results);
            }
            //return callBack(null, results);
        });
        
    },
    viewDocAppointment: (data, callBack) => {
        db.query('SELECT * from appointments where doctor_id=?', 
        [
            data.doctor_id
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    addDiagnosis: (data, callBack) => {
        db.query("UPDATE appointments SET doctor_notes=?, test_name=?, pending_payment=? where appt_id=?",
        [
            data.doctor_notes,
            data.test_name,
            data.chargesForTest,
            data.appt_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getAllMyPatients: (data, callBack) => {
        db.query('SELECT DISTINCT appointments.doctor_id, patients.patient_id, patients.patient_phone, patients.patient_address, patients.patient_name, patients.patient_gender FROM appointments INNER JOIN patients on appointments.patient_id=patients.patient_id where doctor_id=?', 
        [
            data.doctor_id
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    getMyPatientsApptHistory: (data, callBack) => {
        db.query('SELECT DISTINCT appointments.appt_id, appointments.doctor_id, appointments.test_name, appointments.test_report, appointments.doctor_notes, appointments.appt_date, patients.patient_id, patients.patient_name, patients.patient_gender FROM appointments INNER JOIN patients on appointments.patient_id=patients.patient_id where doctor_id=?', 
        [
            data.doctor_id
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    viewMyIndividualPatientsAppointments: (data, callBack) => {
        db.query("SELECT * FROM appointments INNER JOIN doctors ON appointments.doctor_id=doctors.doctor_id INNER JOIN patients ON appointments.patient_id=patients.patient_id where appointments.patient_id=?",
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
    }
}