
class unregisteredPatient {
    constructor(){
   }
   createAccount(password,Name,Gender,DoB,email,phone,address,insurance_number)
   {
       this.confirmUser(this.username,this.password);
       if((typeof Name == "string")&&(typeof Gender == "string")&&(typeof DoB == "string")&&(typeof email == "string")
       &&(typeof phone == "number")&&(typeof insurance_number == "number")
       &&(typeof address == "string")){
           success = "";
           //Patient DBCALL:  insert these values. store in 'success'
           if(success==""){
               throw('This action could not be completed at this time');
           }
           return 201;
       }
       throw('Invalid entry into 1 or more data fields');
   }
   findDoctor(){
   success = "";
       //Doctor DBCALL: find all employees who are doctors
       if(success==""){
           throw('There was an error with this search.');
       }
       return success;
   }
}