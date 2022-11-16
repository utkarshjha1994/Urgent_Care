// Authenticate user - by passing username and password
const credsValidationRequest = (username, password) => {
  return fetch("http://localhost:3000/api/users/login", {
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors",
    },
    
    method: "POST",
    body: JSON.stringify({ "email": username, "password": password }),
  })
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
};

const validateCredentials = async (username, password) => {
  return await credsValidationRequest(username, password);
};

// GET Doctors
async function getUsers() {
  let url = "http://localhost:3000/api/users/viewDoctors";
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
  users.results.forEach((user) => {
    rows.push({ username: user.name, email: user.email });
  });
  return rows;
}

export { renderUsers, validateCredentials };
