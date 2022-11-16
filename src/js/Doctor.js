// GET Doctors
async function getUsers() {
    let url = "../json/DoctorsList.json";
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      alert("Unable to load doctor's list at this moment");
    }
  }
  
  async function renderUsers() {
    let users = await getUsers();
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

    users.results.forEach((user) => {
      rows.push({ username: user.name, email: user.email });
      let htmlSegment = 
      
                            // `<div class="user">
                            //     <img src="${user.profileURL}" >
                            //     <h2>${user.name}</h2>
                            //     <div class="email"><a href="email:${user.email}">${user.email}</a></div>
                            // </div>`
                            //  <img src="img_avatar.png" alt="Avatar" style="width:100%">;

                            `
                           
                            
                          //   <div class="card">
                          //   <div class="container">
                          //     <h4><b>${user.name}</b></h4> 
                          //     <p>${user.speciality}</p> 
                          //     <p>${user.gender}</p> 
                              
                          //   </div>
                          // </div>`;

                          `<div class="container">
                          <div class="row">
                              <div class="col">
                                  <div class="card h-100">
                                      <img src="..." class="card-img-top" alt="...">
                                      <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                      </div>
                                    </div>
                              </div>
                              
                          </div>
                      </div>`;

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