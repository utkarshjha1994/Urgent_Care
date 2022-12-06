const submitForm = document.getElementById("profile-update-form");
const updateButton = document.getElementById("update-profile-button");

var getUser = sessionStorage.getItem("userDetails");
var userRole = sessionStorage.getItem("userRole");
var user = JSON.parse(getUser);

document.getElementById("name").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientName").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientImage11").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage10").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage12").src = sessionStorage.getItem("userImage");
