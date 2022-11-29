const loginTitle = document.getElementById("loginTitle");
const myDashboard = document.getElementById("myDashboard");
const signUp = document.getElementById("signup");

const container = document.getElementById("container");

container.onload = function(e) {
    if (isLoggedIn) {
        loginTitle.innerHTML = "LOGOUT"
        signUp.innerHTML = ""
        myDashboard.innerHTML = "MY DASHBOARD"
        signUp.style.visibility = 'hidden';
    } else {
        loginTitle.innerHTML = "LOGIN"
        signUp.innerHTML = "REGISTRATION"
        myDashboard.innerHTML = ""
        signUp.style.visibility = 'visible';
    }
}

// const element = document.getElementById("signup");
// element.addEventListener("click", myFunction);

import {
    isPatientLoggedIn, clearUserDetails, jwt
} from "../js/StateManagement.js";

console.log(isPatientLoggedIn())
var isLoggedIn = isPatientLoggedIn()

// function myFunction() {
//     var isLoggedIn = isPatientLoggedIn()
//     alert(isLoggedIn)
//   }
 
if (isLoggedIn) {
    loginTitle.innerHTML = "LOGOUT"
    signUp.innerHTML = ""
    myDashboard.innerHTML = "MY DASHBOARD"
    signUp.style.visibility = 'hidden';
} else {
    loginTitle.innerHTML = "LOGIN"
    signUp.innerHTML = "REGISTRATION"
    myDashboard.innerHTML = ""
    signUp.style.visibility = 'visible';
}

myDashboard.onclick = function(e) {
    if (isLoggedIn) {
        window.location = "../html/PatientHome.html";
    } else {

    }
}

loginTitle.onclick = function(e) {
    if (isLoggedIn) {
        // clearUserDetails()
        loginTitle.innerHTML = "LOGOUT"
        signUp.innerHTML = ""
        myDashboard.innerHTML = "MY DASHBOARD"
        signUp.style.visibility = 'hidden';
        window.location = "../html/index.html";
    } else {
        
        // clearUserDetails()
        loginTitle.innerHTML = "LOGIN"
        signUp.innerHTML = "REGISTRATION"
        myDashboard.innerHTML = ""
        signUp.style.visibility = 'visible';
        window.location = "../html/login.html";
    }
}

signUp.onclick = function(e) {
   
    window.location = "../html/signup.html";
}