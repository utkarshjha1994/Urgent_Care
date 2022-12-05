// Authenticate user - by passing username and password
const credsValidationRequest = (username, password) => {
  let url = "http://localhost:3000/login/patients";
  let url1 = "http://localhost:3000/api/users/login";
  let data = { username: username, password: password };
  let data1 = { email: username, password: password };

  return fetch(url1, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },

    method: "POST",
    body: JSON.stringify(data1),
  })
    .then((response) => response.json())
    .catch((error) => error);
};

const validateCredentials = (username, password) => {
  return credsValidationRequest(username, password);
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
  let result = await getUsers();
  return result;
}

// Authenticate user - by passing username and password
const registerUserRequest = (name, email, password, passwordConfirm) => {
  let url = "http://localhost:3000/api/users/patientRegister";
  let data = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  };

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      mode: "cors",
    },

    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => error);
};

const registerUser =  (name, email, password, passwordConfirm) => {
  return registerUserRequest(name, email, password, passwordConfirm);
};


// Authenticate user - by passing username and password
const updateUserRequest = (patient_id, name, email, password, passwordConfirm, gender, dob, user_role, patient_address) => {
  let url = "http://localhost:3000/api/users/updatePatientProfile";
  let data = {
    patient_id: patient_id,
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    gender: gender,
    dob: dob,
    user_role: user_role,
    patient_address: patient_address
  };

  return fetch(url, {
    headers: {
      "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
      "Content-Type": "application/json",
      mode: "cors",
    },

    method: "PATCH",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => error);
};

const updateUser =  (patient_id, name, email, password, passwordConfirm, gender, dob, user_role, patient_address) => {
  console.log(name, email, password)
  return updateUserRequest(patient_id, name, email, password, passwordConfirm, gender, dob, user_role, patient_address);
};

export { renderUsers, validateCredentials, registerUser, updateUser};
