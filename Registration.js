import { registerUser } from "./APIManager.js";

const loginButton = document.getElementById("register-form-submit");
const loginForm = document.getElementById("register-form");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const firstname = loginForm.name.value;
    const emailId = loginForm.email.value;
    const password = loginForm.password1.value;
    const confirmpassword = loginForm.password2.value;

    if (firstname != "" && emailId != ""  && password != ""  && confirmpassword != "" ) {
        registerUser(firstname, emailId, password, confirmpassword)
        .then((result) => {
          console.log(result)
          if (result.success != 1) {
            alert(result.message)
          } else {
            alert("You have succesfully signed up!\nPlease proceed to log in!\nThank you.")
            window.location = "./login.html";
          }
        })
        .catch((error) => {
            alert(error)
        });
    } else {
      alert("Please fill out all fields to proceed further!")
    }
})