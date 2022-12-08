
if (sessionStorage.getItem("jwt") != null) {
  document.getElementById("loginDiv").style.display = 'none'
  document.getElementById("profileDiv").style.display = 'block'
} else {
  document.getElementById("loginDiv").style.display = 'block'
  document.getElementById("profileDiv").style.display = 'none'
}

document.getElementById("patientImage3").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage1").src = sessionStorage.getItem("userImage");

var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);

document.getElementById("name1").innerHTML = user.patient_name.toUpperCase();

renderUsers();

async function renderUsers() {
    let result = await getUsers();
    console.log(result.data)
    return result.data
}

async function getUsers() {
    let url = "http://localhost:3000/api/users/viewDoctors";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      alert("Unable to load doctor's list at this moment");
    }
  }
const data = await renderUsers()




  
export{data}


