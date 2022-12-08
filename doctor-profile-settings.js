import { updateDoctorProfile, logoutRequest } from "./APIManager.js";

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

document.getElementById("logout1").addEventListener("click", (e) => {
    logoutRequest().then((result) => {
      if (result.success === 1) {
        alert("You have been logged out. To access the portal please log in again.")
        sessionStorage.clear()
        window.location = "login.html"
      } else {
          alert(result.message);
      }
      })
      .catch((error) => {
        alert(error);
      });
  });
