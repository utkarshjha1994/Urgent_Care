(function ($) {
  ("use strict");

  // BEING GET DOCTORS LIST AND SET INTO TABLE COLUMN
  var table = document.getElementById("myTable");

  fetch("http://localhost:3000/Doctors", {
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      const doctors = data?.results;
      var i = 0;
      for (const doctor of doctors) {
        var row = table.insertRow(i + 1);
        var name = row.insertCell(0);
        var speciality = row.insertCell(1);
        var dob = row.insertCell(2);
        var gender = row.insertCell(3);
        // var email = row.insertCell(4);
        // var phone = row.insertCell(5);
        // var address = row.insertCell(6);
        // var username = row.insertCell(7);
        var status = row.insertCell(4);
        // 	<tr>
        //   <td>

        //   </td>
        //   <td>Dental</td>

        //   <td>
        //     14 Jan 2019 <br />
        //     <small>02.59 AM</small>
        //   </td>

        //   <td>$3100.00</td>

        //   <td>
        //     <div class="status-toggle">
        //       <input type="checkbox" id="status_1" class="check" checked />
        //       <label for="status_1" class="checktoggle">
        //         checkbox
        //       </label>
        //     </div>
        //   </td>
        // </tr>;
        name.innerHTML = `<h2 class="table-avatar">
          <a href="profile.html" class="avatar avatar-sm mr-2">
            <img
              class="avatar-img rounded-circle"
              src="assets/img/doctors/doctor-thumb-01.jpg"
              alt="User Image"
            />
          </a>
          <a href="profile.html">Dr. ${doctor.name}</a>
        </h2>`;
        speciality.innerHTML = doctor.speciality;
        dob.innerHTML = doctor.dob;
        gender.innerHTML = doctor.gender;
        // email.innerHTML = doctor.email;
        // phone.innerHTML = doctor.phone;
        // address.innerHTML = doctor.address;
        // username.innerHTML = doctor.username;
        status.innerHTML = `<div class="status-toggle">
              <input type="checkbox" id="status_1" class="check" ${
                doctor.status === "active" ? "checked" : ""
              } />
              <label for="status_1" class="checktoggle">
                ${doctor.status}
              </label>
            </div>`;
      }
    });
  // ENDING GET DOCTORS LIST AND SET INTO TABLE COLUMN
})(jQuery);
