import { renderUsers, validateCredentials } from "../js/APIManager.js";
import { updateCurrentUserType, currentUserType } from "../js/StateManagement.js";

// renderUsers().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// });;

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    // console.log(currentUserType)
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    location.reload()
    window.location="/src/html/PatientDashboard.html"
    validateCredentials('john@email.com', '87654321').then((result) => {
            console.log(result);
            alert("You have successfully logged in.")
            updateCurrentUserType("doctor")
            console.log(currentUserType)
            location.reload()
            window.location="/src/html/PatientDashboard.html"
        }).catch((error) => {
            loginErrorMsg.style.opacity = 1
            console.log(error);
        });
})

const passwordField = document.querySelector("#password-field");
const eyeIcon= document.querySelector("#eye");

eyeIcon.addEventListener("click", function(){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
})


const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });



// // Authenticate user - by passing username and password
// let data = {username:'rasika_pun', password:'2345'}
// const credsValidationRequest = (username, password) => {
//     return fetch('http://localhost:3000/login/patients', {
//             mode: 'cors',
//             headers: {
//                     'Content-Type': 'application/json',
//                     mode: 'cors'
//                   },

//             method: 'post',
//             body: JSON.stringify({"username":'rasika_pun', "password":'2345'})
//         })
//     .then((response) => response.text())
//     .then((responseText) => {
//         return responseText;
//     });
// }

// const validateCredentials= async (username, password) => {
//     const viewResponse = await credsValidationRequest(username, password);
//     console.log(viewResponse);
// };

// validateCredentials("rasika_pun", "2345");

// GET All DOCTORS
// async function getUsers() {
//     let url = 'http://localhost:3000/Doctors';
//     try {
//         let res = await fetch(url);
//         console.log(res)
//         return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function renderUsers1() {
//     let users = await getUsers();
//     let html = '';
//     users.results.forEach(user => {
//         let htmlSegment = `<div class="user">
//                             <img src="${user.profileURL}" >
//                             <h2>${user.name}</h2>
//                             <div class="email"><a href="email:${user.email}">${user.email}</a></div>
//                         </div>`;

//         html += htmlSegment;
//     });

//     let container = document.querySelector('.container');
//     container.innerHTML = html;
// }
