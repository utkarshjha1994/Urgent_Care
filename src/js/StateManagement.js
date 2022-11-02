export const UserType = {
  patient : "patient",
  doctor : "doctor",
  labTechinician : "LabTechnician",
  admin : "admin",
  guest : "Guest"
}

var currentUserType = "guest";

function updateCurrentUserType(userType) {
  currentUserType = userType;
}

export {updateCurrentUserType, currentUserType };

