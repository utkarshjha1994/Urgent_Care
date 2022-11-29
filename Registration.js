import { registerUser } from "../js/APIManager.js";

const loginButton = document.getElementById("register-form-submit");
const loginForm = document.getElementById("register-form");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const firstname = loginForm.firstname.value + ' ' + loginForm.lastname.value;
    const emailId = loginForm.emailId.value;
    const password = loginForm.password.value;
    const confirmpassword = loginForm.confirmpassword.value;
    if (firstname != "" && emailId != ""  && password != ""  && confirmpassword != "" ) {
        registerUser(firstname, emailId, password, confirmpassword)
        .then((result) => {
          if (result.success != 1) {
            alert(result.message)
          } else {
            alert("You have succesfully signed up! Please proceed to log in.")
            window.location = "../../html/login.html";
          }
        })
        .catch((error) => {
            alert(error)
        });
    } else {
        console.log("here")
    }
})