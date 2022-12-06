// GET Doctors
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


