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
const registerUserRequest = (name, email, password, passwordConfirm, patient_address, patient_dob, patient_gender, patient_phone) => {
  let url = "http://localhost:3000/api/users/patientRegister";
  let data = {
    name: name,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    patient_address: patient_address,
    patient_dob: patient_dob,
    patient_gender:patient_gender,
    patient_phone: patient_phone
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

const registerUser =  (name, email, password, passwordConfirm, patient_address, patient_dob, patient_gender, patient_phone) => {
  return registerUserRequest(name, email, password, passwordConfirm, patient_address, patient_dob, patient_gender, patient_phone);
};

const updateUserRequest = (patient_id, email, patient_phone, insurance, gender, dob, user_role, patient_address) => {
  let url = "http://localhost:3000/api/users/updatePatientProfile";
  let data = {
    patient_id: patient_id,
    patient_gender: gender,
    patient_dob: dob,
    user_role: user_role,
    patient_address: patient_address,
    patient_phone: patient_phone,
    email: email, 
    patient_insuranceNo: insurance
  };
// console.log(g(data)
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

const updateUser =  (patient_id, email, patient_phone, insurance, gender, dob, user_role, patient_address) => {
  return updateUserRequest(patient_id, email, patient_phone, insurance, gender, dob, user_role, patient_address);
};

const updatePassword = (newPass, confirmPass) => {
  let url = "http://localhost:3000/api/users/changePassword";
  let data = {
    patient_id: sessionStorage.getItem("userDetails").patient_id,
    email: sessionStorage.getItem("userDetails").email,
    password: newPass,
    passwordConfirm: confirmPass,
    user_role: sessionStorage.getItem("userRole")
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

const updatePasswordReq =  (newPass, confirmPass) => {
  return updatePassword(newPass, confirmPass);
};

const getpatients = () => {
  let url = "http://localhost:3000/api/doctors/getAllMyPatients";
  var getUser = sessionStorage.getItem("userDetails");
  var user = JSON.parse(getUser);
  let data = {
    doctor_id: user.doctor_id,
    user_role: sessionStorage.getItem("userRole")
  };

  return fetch(url, {
    headers: {
      "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
      "Content-Type": "application/json",
      mode: "cors",
    },

    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => 
    response.json())
    .catch((error) => error);
};

const getpatientsRequest =  () => {
  return getpatients();
};


// Authenticate user - by passing username and password
const updateDoctorRequest = (name, phone) => {
  let url = "http://localhost:3000/api/doctors/updateDoctorProfile";
  var getUser = sessionStorage.getItem("userDetails");
  var user = JSON.parse(getUser);
  let data = {
    doctor_id: user.doctor_id,
    speciality: user.speciality,
    gender: gender,
    dob: "1995-10-09",
    user_role: "ROLE.DOCTOR",
    address: user.address,
    phone: phone
  };
// console.log(g(data)
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

const updateDoctorProfile =  (name, phoneNumber) => {
  return updateDoctorRequest(name, phoneNumber);
};


const getMyPatientsList = (patient_id) => {
  let url = "http://localhost:3000/api/doctors/viewMyIndividualPatientsAppointments";
  let data = {
    patient_id: patient_id,
    user_role:"ROLE.DOCTOR"
  };

  return fetch(url, {
    headers: {
      "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
      "Content-Type": "application/json",
      mode: "cors",
    },

    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => 
    response.json())
    .catch((error) => error);
};

const getMyPatientsListRequest =  (patient_id) => {
  return getMyPatientsList(patient_id);
};


const logout = () => {
  let url = "http://localhost:3000/api/users/logout";
  return fetch(url, {
    headers: {
      "authorization": 'Bearer ' + sessionStorage.getItem("jwt"),
      "Content-Type": "application/json",
      mode: "cors",
    },

    method: "POST",
  })
    .then((response) => 
    response.json())
    .catch((error) => error);
};

const logoutRequest =  () => {
  return logout();
};

export { renderUsers, validateCredentials, registerUser, updateUser, updatePasswordReq, getpatientsRequest, updateDoctorProfile, getMyPatientsListRequest, logoutRequest };
