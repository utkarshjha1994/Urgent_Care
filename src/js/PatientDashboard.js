const editProfileButton = document.getElementById("edit-profile-patient");
const viewAllDoctorsButton = document.getElementById("view-all-doctors");


editProfileButton.addEventListener("click", (e) => {
    window.location="/src/html/PatientEditProfile.html"
})


viewAllDoctorsButton.addEventListener("click", (e) => {
    window.location="/src/html/ViewAllDoctors.html"
})