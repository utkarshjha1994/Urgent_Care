import { updateUser, logoutRequest } from "./APIManager.js";

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
document.getElementById("insurance").value = user.patient_phone;
if (user.patient_insuranceNo != null) {
  document.getElementById("insurance").value = user.patient_phone;
} else {
  document.getElementById("insurance").value = "";
}
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
    const address = submitForm.address.value + ', ' + submitForm.city.value + ', ' + submitForm.state.value + ', ' + submitForm.zip.value;
    const phone = submitForm.phone.value
    const email = submitForm.email.value

    const insurance = submitForm.insurance.value;
    console.log(insurance[0])
    if (insurance != '' && insurance[0].toLowerCase() != 'A' && insurance[0].toLowerCase() != 'D' && insurance[0].toLowerCase() != 'G') {
      alert('Please enter valid insurance number!!')
      return
    }

    updateUser(user.patient_id, email, phone, insurance, user.patient_gender, user.patient_dob,userRole, address)
    .then((result) => {
    if (result.success === 1) {
      alert("Your information has been updated successfully.\nIf you need to update any other information that fields mentioned please contact admin.")
      const data = JSON.parse(sessionStorage.getItem("userDetails"))
      data.patient_phone = document.getElementById("phone").value;
      data.patient_email = document.getElementById("email").value;
      data.patient_insuranceNo = document.getElementById("insurance").value;
      data.patient_address = address
      sessionStorage.setItem("userDetails", JSON.stringify(data));
    } else {
        alert(result.message);
    }
    })
    .catch((error) => {
      alert(error);
    });
  });

  document.getElementById("logout").addEventListener("click", (e) => {
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


