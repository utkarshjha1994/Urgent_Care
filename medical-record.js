let usertype = "ROLE.PATIENT"


let params = window.location.search.substring(1).split('&');
//console.log("what is this"+sessionStorage.getItem("appointments"));
let item = JSON.parse(sessionStorage.getItem("appointments"));
//console.log((item));
//let appointments = sessionStorge.getItem('appointments');
let patient  = params[0].split('=');
console.log(item.patient_id);
let  patient_id = document.getElementById("patient_id");
patient_id.setAttribute('value',"#SEUC"+item.patient_id);


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
appt.setAttribute('value',item.appt_date);
let dob = document.getElementById("patient_dob");

dob.setAttribute('value',item.patient_dob)
let doctor_id = document.getElementById("doctor_id");
doctor_id.setAttribute('value',"SEUCEMPDOC"+item.doctor_id);
let doctor_name = document.getElementById("doctor_name");

doctor_name.setAttribute('value',item.doctor_name.toUpperCase());

let doctor_notes = document.getElementById("doctor_notes");
let test_name = document.getElementById("test_name");
if(usertype == "ROLE.DOCTOR"){
    doctor_notes.readOnly = false
    test_name.disabled = false

}




doctor_name.setAttribute('value',item.doctor_name.toUpperCase());
let upd = document.getElementById("update");

if(usertype == "ROLE.PATIENT"){
    upd.style.visibility = 'hidden'
}


upd.onclick = function(){update()}

function update(){

}

