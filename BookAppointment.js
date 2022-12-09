
let dropdown  = document.getElementById('doc');
let button = document.getElementById('book');
let patient = document.getElementById('patient');
let date = document.getElementById('date');
let slots = document.getElementById('slots');
var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);
console.log("Patient ID is "+user.patient_id)


var todayDate = new Date();
    var month = todayDate.getMonth();
    var year = todayDate.getUTCFullYear() - 0;
    var tdate = todayDate.getDate();
    if (month < 10) {
        month = "0" + month
    }
    if (tdate < 10) {
        tdate = "0" + tdate;
    }
    var maxDate = year + "-" + month + "-" + tdate;

date.setAttribute("min", '0');

console.log(sessionStorage.getItem("bookingDoctorName"))
let doctor_id = sessionStorage.getItem("bookingDoctorID")
let doctor_name =  sessionStorage.getItem("bookingDoctorName")

var user = JSON.parse(getUser);
button.onclick = function(){book()};
// dropdown.onchange(myFunc()) ;
// res.results.forEach(myFunction);
////function myFunc(){
//}
patient.setAttribute('value',user.patient_name);
dropdown.setAttribute('value',doctor_name);




  
function book() {
  let e = slots
  console.log("Length is"+e.options[e.selectedIndex].value);
  sessionStorage.setItem("Book",JSON.stringify({
    patient_id: user.patient_id,
    doctor_id: doctor_id,
    appt_date: date.value,
    user_role: "ROLE.PATIENT",
    final_charges:"300",
    description:sessionStorage.getItem("bookingDoctorSpeciality")
,
    slots:e.options[e.selectedIndex].value
  
  
  }))

  if(date.value.length == 0 || e.options[e.selectedIndex].text == "Select a Slot--"){
    alert("Please Enter Appointments dates and slots");
  }
  else{
    BookAppointment();
      
      
console.log("Our Data"+JSON.stringify({
  patient_id: user.id,
  doctor_id: doctor_id,
  appt_date: date.value,
  user_role: "ROLE.PATIENT",
  charges:"300",
  insuranceNo:"GHI",
  description:sessionStorage.getItem("bookingDoctorSpeciality")


}));

}
}
var refresh = slots.innerHTML
const inputHandler = function(e) {
  

  var options = document.querySelectorAll('#slots option');
    options.forEach(o => o.remove());

  slots.innerHTML = refresh
  console.log(e.target.value)
  slots.disabled = false
  console.log("value is"+slots.value)
 
  showAvailableSlots(e.target.value)

}

date.addEventListener('input', inputHandler);

function BookAppointment(){
  if(user.patient_insuranceNo==null){
    window.location = "payment.html"
  }
  else{
  const settings = {
    method: "POST", 
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        mode:"cors",
        "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
  
    },
    body: JSON.stringify({
      patient_id: user.patient_id,
      doctor_id: doctor_id,
      appt_date: date.value,
      user_role: "ROLE.PATIENT",
      charges:"300",
      insuranceNo:user.patient_insuranceNo,
     
      description:sessionStorage.getItem("bookingDoctorSpeciality")
  
  
    })
  };


  fetch('http://localhost:3000/api/users/bookAppt', settings)
  .then(response => response.json())
  .then(response =>{ 
    console.log("Response isn "+response.data)
    if(response.success == 1){
      sessionStorage.setItem("Book",JSON.stringify({
        patient_id: user.patient_id,
        doctor_id: doctor_id,
        appt_date: date.value,
        user_role: "ROLE.PATIENT",
        final_charges:response.data.total_charges,
        description:sessionStorage.getItem("bookingDoctorSpeciality"),

        slots:slots.options[slots.selectedIndex].value
      
      }))
     // alert(JSON.stringify(response));

      window.location = "payment.html"
    }

  }).catch(error=>{
    alert("error , click again")

  })
}
}



function showAvailableSlots(item){

  var defaultOptions = {
    method: "POST", 
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        mode:"cors",
        "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),

    },
    body: JSON.stringify({"doctor_id":doctor_id,
    "appt_date":item,
    
    "user_role":"ROLE.PATIENT"})
  }
   console.log(defaultOptions) ;
    fetch('http://localhost:3000/api/users/viewAvailableAppointments', defaultOptions)
  .then(response => response.json())
  .then(response =>{ 
   // data =  JSON.stringify(response)
    response.data.forEach(myFunction)

    function myFunction(item){
      slots.removeChild(document.getElementById(item.slots))
    }

    console.log(response)
    if(response.success==1){
      //alert("Diagnosis Successfully Updated")
    }
    else{
     // alert("Diagnosis Update Failed, Please Try Again")
     alert("Data cannot be retrieved, Please Try Again")

     var options = document.querySelectorAll('#slots option');
    options.forEach(o => o.remove());
    }
    
  
  }).catch(error=>{
   // alert(error)
   let str = ""+error
    var flag = str.includes("Failed to execute 'removeChild'");


    alert(flag)

    if(flag == false){
      var options = document.querySelectorAll('#slots option');
    options.forEach(o => o.remove());
    console.log("Error is"+error)
    }

   
  })


}

