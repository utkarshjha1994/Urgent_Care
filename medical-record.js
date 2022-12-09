
  var getUser = sessionStorage.getItem("userDetails");
  console.log(getUser)
var user = JSON.parse(getUser);
var  side_dash = document.getElementById("side_dash")
var  side_profile = document.getElementById("side_profile")

let usertype = sessionStorage.getItem("userRole")
if(usertype=="ROLE.PATIENT"){
  document.getElementById("patientImage1").src =sessionStorage.getItem("userImage");
  document.getElementById("patientImage2").src =sessionStorage.getItem("userImage");
  document.getElementById("img2").src =sessionStorage.getItem("userImage");


  document.getElementById("name").innerHTML = user.patient_name.toUpperCase();
  side_profile.setAttribute("href","patient-profile.html")

}

else if(usertype=="ROLE.DOCTOR"){
  document.getElementById("name").innerHTML = user.doctor_name.toUpperCase();
  //document.getElementById("speciality").innerHTML = user.doctor_speciality;
  side_dash.setAttribute("href","doctor-dashboard.html")
 // side_profile.setAttribute("href","doctor-profile.html")
}

else if(usertype=="ROLE.LABTECH"){
  //document.getElementById("name").innerHTML = user.doctor_name.toUpperCase();
  //document.getElementById("speciality").innerHTML = user.doctor_speciality;
  side_dash.setAttribute("href","labtech-dashboard.html")
  side_profile.setAttribute("href","doctor-profile.html")
}



//usertype = "ROLE.DOCTOR"


let params = window.location.search.substring(1).split('&');
//console.log("what is this"+sessionStorage.getItem("appointments"));
let item = JSON.parse(sessionStorage.getItem("appointments"));
console.log((item));
//let appointments = sessionStorge.getItem('appointments');
let patient  = params[0].split('=');
console.log(item.patient_id);
let  patient_id = document.getElementById("patient_id");
patient_id.setAttribute('value',"#SEPID"+item.patient_id);


let first_name = document.getElementById("first");
str  = item.patient_name.split(' ')[0].toUpperCase();

first_name.setAttribute('value',str);


let last_name = document.getElementById("last");
str  = item.patient_name.split(' ')[1].toUpperCase();
last_name.setAttribute('value',str);

let patient_email =  document.getElementById("patient_email");
patient_email.setAttribute('value',item.patient_email);

let patient_phone = document.getElementById("patient_phone");
patient_phone.setAttribute('value',item.patient_phone);
let gender = document.getElementById("patient_gender");
gender.setAttribute('value',item.patient_gender);
let appt = document.getElementById("patient_appt");
let a = (new Date(item.appt_date).getMonth()+1) +
          "-" +
          (new Date(item.appt_date).getDate()) +
          "-" +
          new Date(item.appt_date).getFullYear();
appt.setAttribute('value',a);
let dob = document.getElementById("patient_dob");
let d = (new Date(item.patient_dob).getMonth()+1) +
          "-" +
          (new Date(item.patient_dob).getDate()) +
          "-" +
          new Date(item.patient_dob).getFullYear();
dob.setAttribute('value',d)
let doctor_id = document.getElementById("doctor_id");
doctor_id.setAttribute('value',"#SEDID"+item.doctor_id);
let doctor_name = document.getElementById("doctor_name");

doctor_name.setAttribute('value',item.doctor_name.toUpperCase());

let doctor_notes = document.getElementById("doctor_notes");
let test_name = document.getElementById("test_name");
let test_result = document.getElementById("test_result");
let test_status = document.getElementById("test_status")
if(test_result!=null){
  test_result.innerHTML = item.test_report;

}
doctor_notes.innerHTML = item.doctor_notes



doctor_name.setAttribute('value',item.doctor_name.toUpperCase());
let upd = document.getElementById("update");

if(usertype == "ROLE.PATIENT"){
    upd.style.visibility = 'hidden'
}


upd.onclick = function(){update()}
var e = document.getElementById("test_name");
//e.innerHTML = item.test_name
if(item.test_name!=null)
e.value = item.test_name
var test_nam = null
test_nam = e.options[e.selectedIndex].value;

if(usertype == "ROLE.DOCTOR"&& test_nam=="Select"){
  doctor_notes.readOnly = false
  test_name.disabled = false

}

if(usertype=="ROLE.LABTECH"){
  test_result.readOnly = false;
  test_status.disabled = false;
}


function update(){

  test_nam = e.options[e.selectedIndex].text;

  if(usertype == "ROLE.DOCTOR"){
  

    if(doctor_notes.value.length==0){


      alert("Please Enter prescription")
    }
    else{
      updatePrescription();

    }
    

  }

  else if(usertype == "ROLE.LABTECH"){
    if(test_status.options[test_status.selectedIndex].value == "Completed"){
      if(test_result.value.length == 0){
        alert("Enter Test Result")
      }
      else{
        updateTestResult();
      }
    }
    else if(test_status.options[test_status.selectedIndex].value == "Pending"){
      alert("Please complete the test and then save")
    }
  }
    
}


function updateTestResult(){
  var defaultOptions = {
    method: "PUT", 
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        mode:"cors",
    authorization: "Bearer " + sessionStorage.getItem("jwt"),

    },
    body: JSON.stringify({"appt_id":item.appt_id,
    
    "user_role":"ROLE.LABTECH",
    "test_report":test_result.value
  })
  }
   console.log(defaultOptions) ;
    fetch('http://localhost:3000/api/labtechs/modifyTests', defaultOptions)
  .then(response => response.json())
  .then(response =>{ 
    data =  JSON.stringify(response)
    console.log(data)
    if(response.success==1){
      alert("Test Result Successfully Updated")
      window.location = "labtech-dashboard.html";
    }
    else{
      alert("Test Result Update Failed, Please Try Again")
    }
    
  
  }).catch(error=>{
    alert("Test Result Update Failed, Please Try Again")
    console.log(error)
  })
}



function updatePrescription(){


  var defaultOptions = {
    method: "PUT", 
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        mode:"cors",
        "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),

    },
    body: JSON.stringify({"appt_id":item.appt_id,
    "doctor_notes":doctor_notes.value,
    "test_name":test_nam,
    "chargesForTest":"10",
    "user_role":"ROLE.DOCTOR"})
  }
   console.log(defaultOptions) ;
    fetch('http://localhost:3000/api/doctors/addDiagnosis', defaultOptions)
  .then(response => response.json())
  .then(response =>{ 
    data =  JSON.stringify(response)
    console.log(response.success)
    if(response.success==1){
      alert("Diagnosis Successfully Updated")
      window.location = "doctor-dashboard.html";
    }
    else{
      alert("Diagnosis Update Failed, Please Try Again")
    }
    
  
  }).catch(error=>{
    alert("Diagnosis Update Failed, Please Try Again")
    console.log(error)
  })
}



