// GET Doctors
async function getUsers() {
    let url = "../json/DoctorsList.json";
    try {
      let res = await fetch(url);
      console.log(res)
      return await res.json();
    } catch (error) {
      alert("Unable to load doctor's list at this moment");
    }
  }

  async function renderUsers() {

    // fetch("http://localhost:3000/api/users/viewDoctors", {mode: "no-cors"}).then(function(response) {
    //   console.log(response)
    //   return response.json();
    // }).then(function(data) {
    //   console.log(data);
    // }).catch(function() {
    //   console.log("Booo");
    // });

    let users = await getUsers();
    console.log(users)
    let html = "";
    var rows = [];
    var styles = `
    .card {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      transition: 0.3s;
      width: 20%;
    }
    
    .card:hover {
      box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    
    .container {
      padding: 2px 16px;
    }
`
      users.forEach((user) => {
      rows.push({ username: user.name, email: user.email });
      let htmlSegment =  `<div class="card">
                            <div class="container">
                              <h4><b>${user.doctor_name}</b></h4> 
                              <p>${user.doctor_speciality}</p> 
                              <p>${user.doctor_gender}</p> 
                            </div>
                          </div>`;
                          ;
        html += htmlSegment;
    });
    var styleSheet = document.createElement("style")
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
    let container = document.querySelector('.container');
    container.innerHTML = html;
    return rows;
  }
  
  renderUsers();