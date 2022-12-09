import { validateCredentials } from "./APIManager.js";

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
  // Prevent the default submission of the form
  e.preventDefault();
  // Get the values input by the user in the form fields
  const username = loginForm.userid.value;
  const password = loginForm.usrpsw.value;

  if (username === "" || password === "") {
    alert("Please enter valid username and password")
  } else {
    validateCredentials(username, password)
    .then((result) => {
      if (result.success === 1) {
          sessionStorage.setItem("jwt", result.token);
          sessionStorage.setItem("userRole", result.userRole);
          sessionStorage.setItem("userDetails", JSON.stringify(result.user));
          sessionStorage.setItem("userImage", result.image)
        if (result.userRole === 'ROLE.DOCTOR') {
          window.location = "doctor-dashboard.html";
        } else if(result.userRole === 'ROLE.PATIENT') {
          window.location = "patient-dashboard.html";
        }
        else if(result.userRole === 'ROLE.LABTECH') {
          window.location = "labtech-dashboard.html";
        }
        else{
          window.location = "admin-dashboard.html"
        }
      } else {
        alert(result.message);
      }
    })
    .catch((error) => {
      alert(error);
    });
  }
  
});