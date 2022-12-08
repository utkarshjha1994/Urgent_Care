import {logoutRequest} from './APIManager.js'

var getUser = sessionStorage.getItem("userDetails");
var userRole = sessionStorage.getItem("userRole");
var user = JSON.parse(getUser);

console.log(user)

document.getElementById("name").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("name1").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("speciality").innerHTML = user.doctor_speciality;

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

let empTab = document.getElementById("appointments");
let result = "";
let doctor_id = user.doctor_id;
let arr = ["8 pm", 9, 10, 11, 12, 13, 14, 15, 16];
let time_arr = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
// console.log(arr[0]);

var app = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    mode: "cors",
    authorization: "Bearer " + sessionStorage.getItem("jwt"),
  },
  body: JSON.stringify({
    doctor_id: doctor_id,
    user_role: "ROLE.DOCTOR",
  }),
};

fetch("http://localhost:3000/api/doctors/viewDocAppt", app)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    result = data.data;
    console.log("Returned Result is"+JSON.stringify(result));
    RenderData(result);

    // Work with JSON data here
    data.forEach((item) => {
      console.log(item);
    });
    // try {
    //   function myFunction(item){

    //   }
    // } catch {
    //   console.log("heree", error)
    // }
  })
  .catch((err) => {
    // Do something for an error here
  });

function RenderData(result) {
  console.log("render");
  let rowCnt = empTab.rows.length; // get the number of rows.
  console.log("result is " + result);
  result.forEach(myFunction);
  console.log(data);
  function myFunction(item) {
    console.log("item " + item.appt_id);

    var date = new Date(item.appt_date);

    if (date.getTime() < new Date().getTime()) {
      empTab = document.getElementById("app");
      console.log(item.id);
    } else {
      empTab = document.getElementById("appointments");
    }

    let tr = empTab.insertRow(rowCnt); // table row.
    tr = empTab.insertRow(rowCnt);
    date.setHours(arr[item.slot]);
    console.log("new date" + new Date().getTime());
    console.log("date" + date.getTime());

    //     else{
    for (let c = 0; c < 7; c++) {
      let td = document.createElement("td"); // table definition.
      td = tr.insertCell(c);
      if (c == 0) {
        let h = document.createElement("h2");
        h.setAttribute("class", "table-avatar");
        let a = document.createElement("a");
        a.innerHTML = "#SEPID"+item.patient_id;
        
        
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
        var date = new Date(item.appt_date);
        td.innerHTML =
          date.getDate() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getFullYear();
        console.log(date.getTime());
        let span = document.createElement("label");
        span.setAttribute("class", "d-block text-info");

        //  time = [""]
        console.log("here2");

        span.innerHTML = time_arr[item.slots];
        td.appendChild(span);
      }

      if (c == 3) {
        let div = document.createElement("div");
        div.setAttribute("class", "table-actiom");
        //  td.setAttribute('class','text-right')
        let h = document.createElement("a");
        h.setAttribute("href", "#");
        h.setAttribute("class", "btn btn-sm bg-primary-light");
        let i = document.createElement("i");
        i.setAttribute("class", "far fa-eye");
        h.innerHTML = "View";
        //  appointment_details = "hello"
        // updateAppointments("item");
        //  console.log("item is is sis "+sessionStorage.getItem("appointments"))

        h.onclick = function () {
          view(item);
        };
        function view(item) {
          console.log("i aa" + typeof item);

          sessionStorage.setItem("appointments", JSON.stringify(item));

          //   appointment_details = item;
          window.location = "medical-record.html?patient_id=" + item.patient_id;
        }
        div.appendChild(h);
        h.appendChild(i);
        td.appendChild(div);
      }

      
    }
  }
}


