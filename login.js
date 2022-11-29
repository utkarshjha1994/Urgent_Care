import { renderUsers, validateCredentials } from "./APIManager.js";

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
  // Prevent the default submission of the form
  e.preventDefault();
  // Get the values input by the user in the form fields
  const username = loginForm.userid.value;
  const password = loginForm.usrpsw.value;

  validateCredentials('rasikapunde@gmail.com', '12345678')
    .then((result) => {
      console.log((result.user));
      console.log((result.token));
      sessionStorage.setItem("jwt", result.token);
      sessionStorage.setItem("userRole", result.userRole);
      sessionStorage.setItem("userDetails", JSON.stringify(result.user));
      // let jwt = sessionStorage.getItem("jwt");
      window.location = "patient-dashboard.html";
    })
    .catch((error) => {
      alert(error);
    });
});