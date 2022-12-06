
let dropdown  = document.getElementById('doc');
let button = document.getElementById('book');
let patient = document.getElementById('patient');
let date = document.getElementById('date');
let slots = document.getElementById('slots');
var getUser = sessionStorage.getItem("userDetails");

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

var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);


  
function book() {
  let e = slots
  console.log("Length is"+e.options[e.selectedIndex].text);

  if(date.value.length == 0 || e.options[e.selectedIndex].text == "Select a Slot--"){
    alert("Please Enter Appointments dates and slots");
  }
  else{
      
      



  let Payment_Details = async () => {
    const location = window.location.hostname;
    const settings = {
      method: "POST", 
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          mode:"cors",
          "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
    
      },
      body: JSON.stringify({
        patient_id: patient_id,
        doctor_id: doctor_id,
        appt_date: dat,
        user_role: "ROLE.PATIENT",
        charges:"300",
        insuranceNo:"GHI",
        description:sessionStorage.getItem("bookingDoctorSpeciality")
    
    
      })
    };
    try {
        const fetchResponse = await fetch('http://localhost:3000/appointments/book/', settings);
        const data = await fetchResponse.json();
        return data;
    } catch (e) {
        alert("Appointment Could not be booked, Please try again")
        return e;
    }    

  }

  /*var defaultOptions = 
    
    fetch('http://localhost:3000/appointments/book/', defaultOptions)
  .then(response => response.json())
  .then(response => console.log(JSON.stringify(response))).catch(error=>console.log(error))
  // console.log(appointmentsState)
  */
  if(Payment_Details.success==1){
    sessionStorage.setItem("Payment_Details",JSON.stringify(Payment_Details));
    let appointment_details = JSON.stringify({
      patient_id: patient_id,
      doctor_id: doctor_id,
      appt_date: dat,
      user_role: "ROLE.PATIENT",
      charges:"300",
      insuranceNo:"GHI",
      description:sessionStorage.getItem("bookingDoctorSpeciality"),
      slots: slots.value
  
    })
    window.location = "payment.html";
  }


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
    }
    
  
  }).catch(error=>{
   // alert("Diagnosis Update Failed, Please Try Again")
    console.log(error)
  })


}

