export const UserType = {
  patient : "patient",
  doctor : "doctor",
  labTechinician : "labTechnician",
  admin : "admin",
  guest : "Guest"
}

var appointmentsState = "";
var currentUserType = UserType.patient;

function updateCurrentUserType(userType) {
  currentUserType = userType;
}

function updateAppointments(appointments) {
  appointmentsState = appointments  
}

export { updateCurrentUserType, currentUserType, appointmentsState, updateAppointments };

