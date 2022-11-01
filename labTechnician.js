
class labTechnician {
    constructor(username='default',password='default',ID='-1') {
        this.username = username;
        this.password = password;
      this.ID = ID;
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
   updateReport(report, name){
    
	this.confirmUser(this.username,this.password);
            success = "";
            //Appointment DBCALL:  insert these values in test report, test name. Set status to 0. store in 'success'
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return 201;
    }
	getAppointments(){
	this.confirmUser(this.username,this.password);
            success = "";
            //Appointment DBCALL:  Find all appointments where status = 1. store in 'success'
            
            return success;
	}
	
	
	
}