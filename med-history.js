import { logoutRequest } from './APIManager.js'
// for Doctor side profile bar
var getUser = sessionStorage.getItem("userDetails");
var userRole = sessionStorage.getItem("userRole");
var user = JSON.parse(getUser);

document.getElementById("name").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("name1").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("speciality").innerHTML = user.doctor_speciality.toUpperCase();


// For Patients medical history data

var getmyPatients = sessionStorage.getItem("myPatients");
var patients = JSON.parse(getmyPatients);

RenderData(patients);

function RenderData(result) {
  console.log("render");
  let empTab = document.getElementById("appointments");
  let rowCnt = empTab.rows.length; // get the number of rows.
  
  result.forEach(myFunction);
  console.log(data);
  function myFunction(item) {
    
    let tr = empTab.insertRow(rowCnt); // table row.
    tr = empTab.insertRow(rowCnt);

    for (let c = 0; c < 8; c++) {
      let td = document.createElement("td"); // table definition.
      td = tr.insertCell(c);
      if (c == 0) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = '#SEPID' + item.patient_id;
        h.appendChild(a);
        td.appendChild(h);
      }

      if (c == 1) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = item.patient_name;
        h.appendChild(a);
        td.appendChild(h);
      }
      if (c == 2) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = item.doctor_name;
        h.appendChild(a);
        td.appendChild(h);
      }

      if (c == 3) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = item.test_name;
        h.appendChild(a);
        td.appendChild(h);
      }

      if (c == 4) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = item.test_status;
        h.appendChild(a);
        td.appendChild(h);
      }

      if (c == 5) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = item.test_report;
        h.appendChild(a);
        td.appendChild(h);
      }

      if (c == 6) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = item.doctor_notes;
        h.appendChild(a);
        td.appendChild(h);
      }
    }
  }
}

document.getElementById("logout1").addEventListener("click", (e) => {
  logoutRequest().then((result) => {
    if (result.success === 1) {
      alert("You have been logged out. To access the portal please log in again.")
      sessionStorage.clear()
      window.location = "login.html"
    } else {
        alert(result.message);
    }
    })
    .catch((error) => {
      alert(error);
    });
});