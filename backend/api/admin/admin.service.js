const db = require("../../config/DBconnection");

module.exports = {
    checkIfDoctorEmailExists: (data, callBack) => {
        //can lookup in UCusers table too
        db.query('SELECT doctor_email from labtechs where doctor_email=?', 
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
    addDoctor: (data, callBack) => {
        db.query('INSERT INTO doctors(doctor_name,doctor_email,doctor_password,doctor_username,doctor_gender,doctor_dob,doctor_phone,doctor_address,doctor_speciality,doctor_estatus) values(?,?,?,?,?,?,?,?,?,?)', 
        [
            data.name,
            data.email,
            data.password,
            data.email,
            data.gender,
            data.dob,
            data.phone,
            data.address,
            data.speciality,
            "Active"
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
                    "ROLE.DOCTOR"
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
    checkIfAdminEmailExists: (data, callBack) => {
        db.query('SELECT email from UCusers where email=?  and user_role=?', 
        [
            data.email,
            "ROLE.ADMIN"
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    addAdmin: (data, callBack) => {
        db.query('INSERT INTO UCusers(username,email,password,user_role) values(?,?,?,?)', 
        [
            data.email,
            data.email,
            data.password,
            "ROLE.ADMIN"
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    checkIfLabTechEmailExists: (data, callBack) => {
        //can lookup in UCusers table too
        db.query('SELECT labtech_email from labtechs where labtech_email=?', 
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
    addLabTech: (data, callBack) => {
        db.query('INSERT INTO doctors(labtech_name,labtech_email,labtech_password,labtech_username,labtech_gender,labtech_dob,labtech_phone,labtech_address,labtech_speciality,labtech_estatus) values(?,?,?,?,?,?,?,?,?,?)', 
        [
            data.name,
            data.email,
            data.password,
            data.email,
            data.gender,
            data.dob,
            data.phone,
            data.address,
            data.speciality,
            "Active"
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
                    "ROLE.LABTECH"
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
    deactivateDoctor: (data, callBack) => {
        db.query('UPDATE doctors SET doctor_estatus=? WHERE doctor_id = ?', 
        [
            "Not Active",
            data.doctor_id
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    deactivateLabTech: (data, callBack) => {
        db.query('UPDATE labtechs SET labtech_estatus=? WHERE labtech_id = ?', 
        [
            "Not Active",
            data.labtech_id
        ],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    updateAdminProfile: (data, callBack) => {
        db.query("UPDATE UCusers SET username=?, email=?, password=?  where id=?",
        [
            data.email,
            data.email,
            data.password,
            data.id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
        
    },
    viewPatients: callBack => {
        db.query('SELECT * from patients', 
        [],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    viewDoctors: callBack => {
        db.query('SELECT * from doctors', 
        [],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    viewLabTechs: callBack => {
        db.query('SELECT * from labtechs', 
        [],
        (error, results,fields) => {
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    bookAppointment: (data, callBack) => {
        db.query('SELECT * FROM insuranceNW where insurance_company = ? AND coverage_description = ?',
        [
            data.insurance_company,
            data.description
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            else{
                console.log(results);
                console.log(data.charges);
                console.log(results[0].coverage_amount);
                total_payment_made = data.charges - results[0].coverage_amount;
                db.query('INSERT INTO appointments(appt_date,patient_id,doctor_id,total_payment,pending_payment) values(?,?,?,?,?)', 
                [
                    data.appt_date,
                    data.patient_id,
                    data.doctor_id,
                    total_payment_made,
                    0
                ],
                (error, results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    //return callBack(null, results);
                });
                return callBack(null, results);
            }
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
    }
}