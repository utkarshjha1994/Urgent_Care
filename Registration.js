import { registerUser } from "./APIManager.js";

const loginButton = document.getElementById("register-form-submit");
const loginForm = document.getElementById("register-form");



loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const firstname = loginForm.name.value;
    const emailId = loginForm.email.value;
    const password = loginForm.password1.value;
    const confirmpassword = loginForm.password2.value;
    const address = loginForm.address.value
    const city = loginForm.city.value
    const state = loginForm.state.value
    const zip = loginForm.zip.value
    const patient_gender = loginForm.gender.value
    const patient_phone = loginForm.phone.value
    if (patient_gender === "selectedCard") {
      alert('Please select your gender')
    } else {
    if (firstname != "" && emailId != ""  && password != ""  && confirmpassword != "" && address != "" && city != "" && state != "" && zip != "") {
        const patient_address = address + ', ' + city + ', ' + state + ', ' + zip
        registerUser(firstname, emailId, password, confirmpassword, patient_address, "1996-10-23", patient_gender, patient_phone)
        .then((result) => {
          console.log(result)
          if (result.success != 1) {
            alert(result.message)
          } else {
            alert("You have succesfully signed up!\nPlease proceed to log in!\nThank you.")
            // window.location = "./login.html";
          }
        })
        .catch((error) => {
            alert(error)
        });
    } else {
      alert("Please fill out all fields to proceed further!")
    }
    }

    
})