const db = require("../../config/DBconnection");

module.exports = {
    getTests: (data, callBack) => {
        db.query("SELECT test_name, appt_id, patient_id, doctor_id, test_status FROM appointments WHERE test_status=?",
        [
            "Pending"
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results); //role also included
            return callBack(null, results);
        });
    },
    modifyTests: (data, callBack) => {
        db.query("UPDATE appointments SET test_status=?, test_report=? WHERE appt_id=? ",
        [
            "Done",
            data.test_report,
            data.appt_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results); //role also included
            return callBack(null, results);
        });
    },
    changePassword: (data, callBack) => {
        db.query("UPDATE labtechs SET labtech_password=? where labtech_id=?",
        [
            data.password,
            data.labtech_id
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
                            "ROLE.LABTECH"
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
        db.query("SELECT labtech_gender, labtech_dob, labtech_phone, labtech_address, labtech_speciality FROM labtechs where labtech_id=?",
        [
            data.labtech_id
        ],
        (error, results, fields) => {
            if(error){
                return callBack(error);
            }
            console.log(results);
            return callBack(null, results);
        });
    },
    updateLabTechProfile: (data, callBack) => {
        db.query("UPDATE labtechs SET labtech_gender=?, labtech_dob=?, labtech_phone=?, labtech_address=?, labtech_speciality=?  where labtech_id=?",
        [
            data.gender,
            data.dob,
            data.phone,
            data.address,
            data.speciality,
            data.labtech_id
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
}