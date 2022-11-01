
class admin {
 	constructor(funccall,username='default',password='default') {
      this.username = username;
      this.password = password;
      //TABLE OF INSURANCES. form of object
      const insurance_table ={Medicare:80};
    }
    confirmUser(username,password){
        conf = "";
        //labTechnician DBCALL : where DBusername= username and DBpassword = password and specialty = admin. if exists, conf = it
        if(conf==""){
            throw('Invalid Username/Password');
        }
		return 201;
    }
    login(){
        return this.confirmUser(this.username,this.password)
    }
	addLabTech(username,password,Name,specialty)
    {
			this.confirmUser(this.username,this.password);
            success = "";
            //labTech DBCALL:  insert these values. store in 'success'
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return 201;
    }
    deleteLabTech(username)
    {            //labTech DBCALL:  delete row where Id= username
            return 201;
    }
	viewLabTech(username)
    {
            success = "";
            //labTech DBCALL:  return row where Id= username
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return success;
    }
	ModifyLabTech(username,password,Name,specialty)
    {
	this.deleteLabTech(username);
	return this.addLabTech(username,password,Name,specialty)
	}
		addDoctor(username,password,Name,specialty)
    {
			this.confirmUser(this.username,this.password);
            success = "";
            //Doctor DBCALL:  insert these values. store in 'success'
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return 201;
    }
    deleteLabTech(username)
    {            //labTech DBCALL:  delete row where Id= username
            return 201;
    }
	viewLabTech(username)
    {
            success = "";
            //labTech DBCALL:  return row where Id= username
            if(success==""){
                throw('This action could not be completed at this time');
            }
            return success;
    }
	ModifyLabTech(username,password,Name,specialty)
    {
	this.deleteLabTech(username);
	return this.addLabTech(username,password,Name,specialty)
	}

}