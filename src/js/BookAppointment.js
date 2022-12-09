var a = "hello";
var defaultOptions;
import { updateAppointments, appointmentsState } from "./StateManagement.js";

let dropdown  = document.getElementById('doc');
let button = document.getElementById('book');

button.onclick = function(){book()}
// dropdown.onchange(myFunc()) ;
// res.results.forEach(myFunction);
////function myFunc(){
//}

fetch('http://localhost:3000/Doctors')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    //console.log(data.results);
    // Work with JSON data here
    data.results.forEach((item) => {
      //console.log(item);
         var option = document.createElement("option");
          option.text = item.name;
          option.id = item.id;;
          dropdown.appendChild(option);
    });
    // try {
    //   function myFunction(item){
        
    //   }
    // } catch {
    //   //console.log("heree", error)
    // }
    

  })
  .catch((err) => {
    // Do something for an error here
  })

  var patient  = document.getElementById('pat');

  fetch('http://localhost:3000/Patients')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    data.results.forEach(myFunction);
    function myFunction(item){
       var  option = document.createElement("option");
        option.text = item.name;
        option.id = item.id;
        patient.appendChild(option);
    }
  })
  .catch((err) => {
    // Do something for an error here
    
  })

function book() {
    var date = document.getElementById("date").value;
    document.getElementById("date").setAttribute("required", '');
    var doctor_id = dropdown.options[dropdown.selectedIndex].id;
    var patient_id = patient.options[dropdown.selectedIndex].id
    var data = JSON.stringify({ "date": date,"patient_id": patient_id,"doctor_id":doctor_id,total_payment:"4000"  
});

var appointments1 = {
  method: "POST", 
  mode: "cors",
  headers: {
      "Content-Type": "application/json",
      mode:"cors",
  },
  body: data
}
  
/*  fetch('http://localhost:3000/appointments/book/', defaultOptions)
.then(response => response.json())
.then(response => //console.log(JSON.stringify(response))).catch(error=>//console.log(error))*/
updateAppointments("123");
// //console.log(appointmentsState)
window.location = "../html/payment.html";

}


