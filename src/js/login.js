import { currentUserType, updateCurrentUserType } from "./StateManagement.js";

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    console.log(currentUserType)
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    alert("You have successfully logged in.");
        console.log(currentUserType);
        updateCurrentUserType("patient");
        console.log(currentUserType);
        // location.reload();
        window.location="/src/html/PatientDashboard.html"

    // if (username === "r" && password === "r") {
    //     // If the credentials are valid, show an alert box and reload the page
    //     alert("You have successfully logged in.");
    //     console.log(currentUserType);
    //     updateCurrentUserType("patient");
    //     console.log(currentUserType);
    //     // location.reload();
    //     window.location="/about.html"
    // } else {
    //     // Otherwise, make the login error message show (change its oppacity)
    //     loginErrorMsg.style.opacity = 1;
    // }
})

const passwordField = document.querySelector("#password-field");
const eyeIcon= document.querySelector("#eye");

eyeIcon.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
})