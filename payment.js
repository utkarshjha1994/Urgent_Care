
//import { appointmentsState } from "./StateManagement.js";
var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);
document.getElementById("patientName").innerHTML =
  user.patient_name.toUpperCase();

document.getElementById("patientImage1").src =
  sessionStorage.getItem("userImage");
document.getElementById("patientImage2").src =
  sessionStorage.getItem("userImage");



try{


let pay  = document.getElementById('pay');
let inputtxt = document.getElementById("card_no");
let owner = document.getElementById("owner");
let cvv = document.getElementById("cvv");
let date =   document.getElementById("years");
let month = document.getElementById("months");
 


pay.onclick = function(){myFunction()}
 let body = sessionStorage.getItem("Book")

 console.log(body)
let booking_details = JSON.parse(sessionStorage.getItem("Book"))

let doctor = document.getElementById("doctor_name");
let current_date = document.getElementById("date");
let current_time = document.getElementById("time");
 let dat = new Date();
 doctor.innerHTML = sessionStorage.getItem("bookingDoctorName")
current_date.innerHTML = (dat.getMonth()+1) +
"-" +
(dat.getDate() ) +
"-" +
dat.getFullYear();
current_time.innerHTML = dat.getHours()+":"+dat.getMinutes()

//alert(booking_details);
console.log("Booking Details is "+"$"+booking_details.final_charges);

let ch = document.getElementById("charges")
ch.innerHTML = "$"+booking_details.final_charges

const validateCardNumber = number => {
    //Check if the number contains only numeric value  
    //and is of between 13 to 19 digits
    const regex = new RegExp("^[0-9]{13,19}$");
    if (!regex.test(number)){
        return false;
    }
    
    return true;
  //  return luhnCheck(number);
}

const luhnCheck = val => {
    let checksum = 0; // running checksum total
    let j = 1; // takes value of 1 or 2

    // Process each digit one by one starting from the last
    for (let i = val.length - 1; i >= 0; i--) {
      let calc = 0;
      // Extract the next digit and multiply by 1 or 2 on alternative digits.
      calc = Number(val.charAt(i)) * j;

      // If the result is in two digits add 1 to the checksum total
      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      // Add the units element to the checksum total
      checksum = checksum + calc;

      // Switch the value of j
      if (j == 1) {
        j = 2;
      } else {
        j = 1;
      }
    }
  
    //Check if it is divisible by 10 or not.
    return (checksum % 10) == 0;
}


function myFunction(){
    var dvalue =   date.value;
 var mvalue  = month.value;
   // alert(dvalue)
    console.log(new Date().getFullYear())

    
    var error = "";
  //  var cardno = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    
    if(validateCardNumber(inputtxt.value))
        {
            console.log(inputtxt.value)
        }
      else
        {
            error = "Not a valid card number\n";

        //alert("Not a valid Discover card number!");
        //return false;
        }
       // if(/^[A-Za-z\s]*$s/.test(owner.value)==false||owner.value ==""){
        if(owner.value ==""){

            error = error + "Not a valid Owner Name\n"
        }
        //alert(cvv.value);
        if(/^\d+$/.test(cvv.value)==false||cvv.value.length!=3){
            error  = error+"Not a valid cvv";
        }
      //alert(mvalue)

        //if(dvalue.length == 0||dvalue==newDate().getFullYear()){
        /*  if(dvalue.length == 0||dvalue==newDate().getFullYear()){
            if(mvalue.length == 0||mvalue<newDate().getMonth()){
                error = error+"\nPlease Enter Correct Expiry Date"
            }
        }
        else if(dvalue.length == 0||dvalue<newDate().getFullYear()){
               error = error+"\nPlease Enter Correct Expiry Date"
        }*/

        if((dvalue.length!=4||dvalue<2023)){
          error = error+"\nPlease Enter Correct Expiry Year"
        }

        if(((mvalue.length!=1&&mvalue.length!=2)||mvalue>12)){
          error = error+"\nPlease Enter Correct Expiry Month"
        }


       // makePayment()
        if(error!=""){
            console.log(error);
           alert(error);

        }
        else{
            makePayment()

        }

  //  console.log('clicked')
  //  console.log(appointmentsState);



}

function makePayment(){
    /*if(user.patient_insuranceNo==null){
     // window.location = "payment.html"
    }*/
    console.log("body     "+body)

    const settings = {
      method: "POST", 
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          mode:"cors",
          "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
    
      },
      body: body
    };
  
  
    fetch('http://localhost:3000/api/users/makePayment', settings)
    .then(response => response.json())
    .then(response =>{ 
      console.log("Response isn "+JSON.stringify(response))
      if(response.success == 1){
        alert("Booking Success");
        window.location = "patient-dashboard.html"
      }
      else{
        alert("Booking Failed, Click Again")
        

      }
  
    }).catch(error=>{
      alert("Booking Failed, Click Again")
  
    })
    
  }
}
catch(error){
  alert(error)
}
