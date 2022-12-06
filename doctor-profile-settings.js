import { updateDoctorProfile } from "./APIManager.js";

var getUser = sessionStorage.getItem("userDetails");
var userRole = sessionStorage.getItem("userRole");
var user = JSON.parse(getUser);

document.getElementById("name").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("name1").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("speciality").innerHTML = user.doctor_speciality;
const form = document.getElementById("doctorInfo")
document.getElementById("doctorId").value = '#SEDID' + user.doctor_id;
document.getElementById("email").value = user.doctor_email;
document.getElementById("doctorName").value = user.doctor_name;
document.getElementById("phone").value = user.doctor_phone;

