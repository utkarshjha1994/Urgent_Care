
class Doctor {
    constructor(username='default',password='default',ID='-1') {
        this.username = username;
        this.password = password;
      this.ID = ID;
      const test_table ={Xray:40};
   }
   confirmUser(username,password){
       conf = "";
       //labTechnician DBCALL : where DBusername= username and DBpassword = password and specialty is not admin. if exists, conf = it
       if(conf==""){
           throw('Invalid Username/Password');
       }
       return 201;
   }
   login(){
		return confirmUser(this.username,this.password);
   }
   updateAppointment(date,prescription, test_name){

   
	this.confirmUser(this.username,this.password);
            cost =0;
            payment = 0;
            if(test_name in test_table){
                cost = test_table.test_name;
                success = "";
            //Appointment DBCALL: for this date and Doctor, get the current cost and paymen pending.
            if(success==""){
                throw('This action could not be completed at this time');
            }
            [oldcost,oldpayment] = success;
            cost = oldcost+cost;
            payment = oldpayment+payment;
            }
            success = "";
            //Appointment DBCALL:  insert these values in prescription and test_name and cost and payment.
            //Set status to 1
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return 201;
    }
	getAppointments(){
	this.confirmUser(this.username,this.password);
            success = "";
            //Appointment DBCALL:  Find all appointments where DoctorID = this doctor id
            
            return success;
	}
	
	
	
}