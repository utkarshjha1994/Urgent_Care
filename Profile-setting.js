import { updateUser } from "./APIManager.js";

const submitForm = document.getElementById("profile-update-form");
const updateButton = document.getElementById("update-profile-button");

var getUser = sessionStorage.getItem("userDetails");
var userRole = sessionStorage.getItem("userRole");
var user = JSON.parse(getUser);

let arr = user.patient_address.split(', ');

document.getElementById("name").innerHTML = user.patient_name.toUpperCase();
document.getElementById("name1").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientName").value = user.patient_name.toUpperCase();

document.getElementById("email").value = user.patient_email;
document.getElementById("phone").value = user.patient_phone;
document.getElementById("patientImage").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage1").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage2").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage3").src = sessionStorage.getItem("userImage");

document.getElementById("address").value = arr[0];
document.getElementById("city").value = arr[1];
document.getElementById("state").value = arr[2];
document.getElementById("zip").value = arr[3];

updateButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = submitForm.username.value;
    const email = submitForm.email.value;
    const address = submitForm.address.value + ', ' + submitForm.city.value + ', ' + submitForm.state.value + ', ' + submitForm.zip.value;
    
    updateUser(user.patient_id, user.patient_phone, user.patient_gender, user.patient_dob,userRole, address)
    .then((result) => {
    if (result.success === 1) {
      alert("Updated Successfully!!")
        // sessionStorage.setItem("jwt", result.token);
        // sessionStorage.setItem("userRole", result.userRole);
        // sessionStorage.setItem("userDetails", JSON.stringify(result.user));
        // sessionStorage.setItem("userImage", result.image)
        // let jwt = sessionStorage.getItem("jwt");
        // window.location = "patient-dashboard.html";
    } else {
        alert(result.message);
    }
    })
    .catch((error) => {
    alert(error);
    });
  });

  document.getElementById("logout").addEventListener("click", (e) => {
    sessionStorage.clear()
    window.location = "login.html"
  });
  document.getElementById("logout1").addEventListener("click", (e) => {
    sessionStorage.clear()
    window.location = "login.html"
  });


