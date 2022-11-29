var currentUserRole;
var patient;
var jwt;

function updateCurrentUserRole(userRole) {
  currentUserRole = userRole;
}

function updatePatientDetails(patientDetails) {
  patient = patientDetails;
}

function updateJWT(jwtNew) {
  jwt = jwtNew;
  console.log(jwt);
}

function clearUserDetails() {
  jwt = null;
  patient = null;
  currentUserRole = null;
}

function isPatientLoggedIn() {
  return patient != null
}

export { updateCurrentUserRole, currentUserRole, updatePatientDetails, patient, updateJWT, jwt, clearUserDetails, isPatientLoggedIn };

