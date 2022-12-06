import { updatePasswordReq } from "./APIManager.js";

const submitForm = document.getElementById("changePass");
const saveButton = document.getElementById("save");

var getUser = sessionStorage.getItem("userDetails");
var userRole = sessionStorage.getItem("userRole");
var user = JSON.parse(getUser);

document.getElementById("name").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientName").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientImage11").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage10").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage12").src = sessionStorage.getItem("userImage");

saveButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const newPass = submitForm.newPass.value;
    const confirmPass = submitForm.confirmPass.value;
  
    if (newPass === "" || confirmPass === "") {
      alert("Please enter valid password")
    } else {
    updatePasswordReq(newPass, confirmPass)
      .then((result) => {
        if (result.success === 1) {
            alert(result.message);
            window.location = "patient-dashboard.html";
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
    }
  });

  document.getElementById("logout").addEventListener("click", (e) => {
    sessionStorage.clear();
    window.location = "login.html";
  });
  document.getElementById("logout1").addEventListener("click", (e) => {
    sessionStorage.clear();
    window.location = "login.html";
  });