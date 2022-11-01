
class registeredPatient {
    constructor(username='default',password='default',ID='-1') {
      this.username = username;
      this.password = password;
	this.ID = ID
      //TABLE OF INSURANCES. form of object
      const insurance_table ={Medicare:80};
    }
    confirmUser(username,password){
        conf = "";
        //Patient DBCALL : where DBusername= username and DBpassword = password. if exists, conf = it
        if(conf==""){
            throw('Invalid Username/Password');
        }
		return 201;
    }

    saveModifiedProfile(Name,Gender,DoB,email,phone,address,insurance_number)
    {
        this.confirmUser(this.username,this.password);
        if((typeof Name == "string")&&(typeof Gender == "string")&&(typeof DoB == "string")&&(typeof email == "string")
        &&(typeof phone == "number")&&(typeof insurance_number == "number")
        &&(typeof address == "string"))
        {
            success = "";
            //Patient DBCALL: where this.username and this.password, insert these values (and overwrite previous ones). store in 'success'
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return 201;
        }
        throw('Invalid entry into 1 or more data fields');
    }
  
    getProfile()
    {
        this.confirmUser(this.username,this.password);
        success = "";
        //Patient DBCALL: where this.username and this.password, insert these values. 
        if(success==""){
            throw('This action could not be completed at this time');
        }
        return success,this.username,this.password
    }
	login(){
		this.confirmUser(this.username,this.password);
        success = "";
        //Patient DBCALL: where this.username and this.password, get Patient ID.
        return success;
	}
    findDoctor(Gender = "*",Specialty = "*", Name = "*")
    {
        this.confirmUser(this.username,this.password);
        if(Gender = "*",Specialty = "*", Name = "*"){
            throw('No Search Terms entered')
        }
        success = "";
        //Doctor DBCALL: Find all job_type = Doctors meeting these criteria
        if(success==""){
            throw('No Doctors found meeting these criteria');
        }
        return success;
    }
    
    bookAppointment(appointment_date,doctor_id,doctor_name,patient_id){
        this.confirmUser(this.username,this.password);
        
        if((typeof appointment_date == 'string')&&(typeof doctor_id =="number")&&(typeof doctor_name =="number")&&(typeof name =="string")&&(typeof email =="string")){
            success = "";
            //Availability DBCALL: where doctor_id is the one provided, get the dates which are filled. assume return array of dates where doctor is busy
            if(!success.includes(appointment_slot)){
				ret = '';
				//Patient DBCALL: get insurance_name and patient id of this.username
				cost = 100;
				if(ret in insurance_table){
					cost = cost*insurance_table.ret;
				}
                pending_payment = cost;
                
			attempt = "";
                //Availability DBCALL: create new entry of this.username, name, doctor_name,doctor_id,email, appt date, with prescription, and note fields  
  
                if(success==""){
                    throw('This action could not be completed at this time');
                }

            return 201;       
            }
            throw('This appointment time was not available');

        }
        throw('Invalid information entered');

    }
    viewAppointment(){
        this.confirmUser(this.username,this.password);
        
            success = "";
                //Availability DBCALL: get line where DB username = this.username).   
                if(success==""){
                    throw('This Patient does not have an appointment');
                } 
            return success;
    }
    deleteAppointment(date){
        this.confirmUser(this.username,this.password);
        success = "";
        //Availability DBCALL: delete line where DB username = this.username and date = date).   
        if(success==""){
            throw('This Patient does not have an appointment');
        } 
    return 201;
    }
   saveModifiedAppointment(appointment_slot,doctor_id,doctor_name,name,email,original_appt_date){
    this.deleteAppointment(original_appt_date);
    return this.bookAppoitnment(appointment_slot,doctor_id,doctor_name,email);
   }
Pay(payment_amount,date){
this.confirmUser(this.username,this.password);
        success = "";
        //Availability DBCALL: get pending payment from line where DB userID = this.ID and date = date).   
        if(success==""){
            throw('This Patient does not have an appointment');
        } 
	ans = parseInt(success)- payment_amount;
	success = "";
        //Availability DBCALL: insert and into pending payment from line where DB userID = this.ID and date = date).    
	
    return 201;

}
}
