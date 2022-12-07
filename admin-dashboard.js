getDoctors();
getPatients();
getLabTechs();
async function getDoctors() {
  await axios
    .get(`http://localhost:3000/api/admins/viewDoctors`, {
      headers: {
        "Access-Control-Allow-Origin": `*`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZW1haWwuY29tIn0sImlhdCI6MTY2ODMxNzUwOCwiZXhwIjoxNjc2MDkzNTA4fQ.hPgrkhMBzkySl78wmc75uOrm4_kSf9UiLYDFBT1Ug-U ",
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      //   console.log(response.data.data);
      var table = "";
      for (var i = 0; i < response.data.data.length; i++) {
        // console.log(response.data[i]);
        table += `
              <tr>
                  <td>${response.data.data[i].doctor_id}</td>
                  <td>${response.data.data[i].doctor_name}</td>
                  <td>${response.data.data[i].doctor_gender}</td>
                  <td>${response.data.data[i].doctor_speciality}</td>
                  <td>${response.data.data[i].doctor_email}</td>
                  
              
          `;
        if (response.data.data[i].doctor_estatus == "Active") {
          table += `
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="updateDoctorStatus($(this))" type="checkbox" id="doctor_status_${response.data.data[i].doctor_id}" checked>
                        <label class="form-check-label" for="doctor_status_${response.data.data[i].doctor_id}"></label>
                    </div>
                </td>
            `;
        } else {
          table += `
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="updateDoctorStatus($(this))" type="checkbox" id="doctor_status_${response.data.data[i].doctor_id}" disabled>
                        <label class="form-check-label" for="doctor_status_${response.data.data[i].doctor_id}"></label>
                    </div>
                </td>
            `;
        }
        table += "</tr>";
      }
      //   console.log("table" + doctor_table);
      document.getElementById("doctor-table").innerHTML = table;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

async function getPatients() {
  await axios
    .get(`http://localhost:3000/api/admins/viewPatients`, {
      headers: {
        "Access-Control-Allow-Origin": `*`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZW1haWwuY29tIn0sImlhdCI6MTY2ODMxNzUwOCwiZXhwIjoxNjc2MDkzNTA4fQ.hPgrkhMBzkySl78wmc75uOrm4_kSf9UiLYDFBT1Ug-U ",
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      //   console.log(response.data.data);
      var table = "";
      for (var i = 0; i < response.data.data.length; i++) {
        // console.log(response.data[i]);
        table += `
              <tr>
                  <td>${response.data.data[i].patient_id}</td>
                  <td>${response.data.data[i].patient_name}</td>
                  <td>${response.data.data[i].patient_gender}</td>
                  <td>${response.data.data[i].patient_email}</td>
                  
              </tr>
          `;
      }
      //   console.log("table" + table);
      document.getElementById("patient-table").innerHTML = table;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

// async function getAppointments() {
//   await axios
//     .get(`http://localhost:3000/api/admins/viewAppointments`, {
//       headers: {
//         "Access-Control-Allow-Origin": `*`,
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZW1haWwuY29tIn0sImlhdCI6MTY2ODMxNzUwOCwiZXhwIjoxNjc2MDkzNTA4fQ.hPgrkhMBzkySl78wmc75uOrm4_kSf9UiLYDFBT1Ug-U ",
//         "Content-Type": "application/json",
//       },
//     })
//     .then(function (response) {
//       console.log(response.data.data);
//       var table = "";
//       for (var i = 0; i < response.data.data.length; i++) {
//         console.log(response.data[i]);
//         var date = response.data.data[i].appt_date.split("T");
//         var day = date[0];
//         var time = date[1].substring(0, 8);
//         table += `
//               <tr>
//                   <td>${response.data.data[i].appt_id}</td>
//                   <td>${response.data.data[i].doctor_id}</td>
//                   <td>${response.data.data[i].patient_id}</td>
//                   <td>${day}</td>
//                     <td>${time}</td>
//               </tr>
//           `;
//       }
//       //   console.log("table" + table);
//       document.getElementById("appointment-table").innerHTML = table;
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//     .finally(function () {
//       // always executed
//     });
// }

async function getLabTechs() {
  await axios
    .get(`http://localhost:3000/api/admins/viewLabTechs`, {
      headers: {
        "Access-Control-Allow-Origin": `*`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZW1haWwuY29tIn0sImlhdCI6MTY2ODMxNzUwOCwiZXhwIjoxNjc2MDkzNTA4fQ.hPgrkhMBzkySl78wmc75uOrm4_kSf9UiLYDFBT1Ug-U ",
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      //   console.log(response.data.data);
      var table = "";
      for (var i = 0; i < response.data.data.length; i++) {
        // console.log(response.data[i]);
        table += `
              <tr>
                  <td>${response.data.data[i].labtech_id}</td>
                  <td>${response.data.data[i].labtech_name}</td>
                  <td>${response.data.data[i].labtech_gender}</td>
                  <td>${response.data.data[i].labtech_speciality}</td>
                  <td>${response.data.data[i].labtech_email}</td>
                  
              
          `;
        if (response.data.data[i].labtech_estatus == "Active") {
          table += `
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="updateDoctorStatus($(this))" type="checkbox" id="doctor_status_${response.data.data[i].labtech_id}" checked>
                        <label class="form-check-label" for="doctor_status_${response.data.data[i].labtech_id}"></label>
                    </div>
                </td>
            `;
        } else {
          table += `
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input" onClick="updateDoctorStatus($(this))" type="checkbox" id="doctor_status_${response.data.data[i].labtech_id}" disabled>
                        <label class="form-check-label" for="doctor_status_${response.data.data[i].labtech_id}"></label>
                    </div>
                </td>
            `;
        }
        table += "</tr>";
      }
      //   console.log("table" + table);
      document.getElementById("lab-table").innerHTML = table;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

function updateDoctorStatus(t) {
  if (t.is(":checked")) {
    //activate
    console.log(t[0].id.split("_")[2]);
  } else {
    //deactivate
    deactivateDoctor(t[0].id.split("_")[2]);
    console.log("deactivate");
  }
}

async function deactivateDoctor(doctor_id) {
  url = "http://localhost:3000/api/admins/deactivateDoctor";
  const body = {
    doctor_id: doctor_id,
    user_role: "ROLE.ADMIN",
  };
  await axios
    .patch(url, body, {
      headers: {
        "Access-Control-Allow-Origin": `*`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZW1haWwuY29tIn0sImlhdCI6MTY2ODMxNzUwOCwiZXhwIjoxNjc2MDkzNTA4fQ.hPgrkhMBzkySl78wmc75uOrm4_kSf9UiLYDFBT1Ug-U ",
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateLabStatus(t) {
  if (t.is(":checked")) {
    //activate
    console.log(t[0].id.split("_")[2]);
  } else {
    //deactivate
    deactivateDoctor(t[0].id.split("_")[2]);
    console.log("deactivate");
  }
}

async function deactivateLabTech(labtech_id) {
  url = "http://localhost:3000/api/admins/deactivateLabTech";
  const body = {
    doctor_id: labtech_id,
    user_role: "ROLE.ADMIN",
  };
  await axios
    .patch(url, body, {
      headers: {
        "Access-Control-Allow-Origin": `*`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjMsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZW1haWwuY29tIn0sImlhdCI6MTY2ODMxNzUwOCwiZXhwIjoxNjc2MDkzNTA4fQ.hPgrkhMBzkySl78wmc75uOrm4_kSf9UiLYDFBT1Ug-U ",
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
