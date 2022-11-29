var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);
document.getElementById("name").innerHTML = user.patient_name;