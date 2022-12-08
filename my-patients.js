import { getpatientsRequest, getMyPatientsListRequest, logoutRequest } from "./APIManager.js";

const result = await getpatientsRequest();

var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);

document.getElementById("name").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("name1").innerHTML = user.doctor_name.toUpperCase();
document.getElementById("speciality").innerHTML = user.doctor_speciality;

if (result.success === 1) {
  console.log(result);
} else {
  alert(result.message);
}

document.getElementById("logout1").addEventListener("click", (e) => {
  logoutRequest().then((result) => {
    if (result.success === 1) {
      alert("You have been logged out. To access the portal please log in again.")
      sessionStorage.clear()
      window.location = "login.html"
    } else {
        alert(result.message);
    }
    })
    .catch((error) => {
      alert(error);
    });
});

var data = result.data;

function getdocid(number) {
  return data[number]["doctor_id"];
}
function getpatientid(number) {
  return data[number]["patient_id"];
}
function getgender(number) {
  return data[number]["patient_gender"];
}
function getphone(number) {
  return data[number]["patient_phone"];
}
function getaddress(number) {
  return data[number]["patient_address"];
}
function getname(number) {
  return data[number]["patient_name"];
}
function getnumcards() {
  return data.length;
}
export function container() {
  document.getElementsByClassName("container").innerHTML = "";
  //router.post("/getAllMyPatients", checkToken, checkUser(["ROLE.DOCTOR"]), getAllMyPatients);
  for (let i = 0; i < getnumcards(); i++) {
    let clmd = document.createElement("div");
    clmd.setAttribute(
      "class",
      "mbsc-col-12 mbsc-col-sm-6 mbsc-col-lg-4 mbsc-col-xl-3"
    );
    //clmd.setAttribute("height", "500");
    //clmd.setAttribute("width", "300");
    //clmd.style.display =inline-block;
    let cprof = document.createElement("div");
    cprof.setAttribute("class", "card widget-profile pat-widget-profile");
    clmd.appendChild(cprof);
    let cardbody = document.createElement("div");
    cardbody.setAttribute("class", "card-body");
    cprof.appendChild(cardbody);
    let pwc = document.createElement("div");
    pwc.setAttribute("class", "pro-widget-content");
    cardbody.appendChild(pwc);
    let piw = document.createElement("div");
    piw.setAttribute("class", "profile-info-widget");
    pwc.appendChild(piw);
    let img = document.createElement("img");
    img.setAttribute("src", "assets/img/generic_patient.png");
    img.setAttribute("height", "100");
    img.setAttribute("width", "100");
    piw.appendChild(img);
    let pdi = document.createElement("div");
    pdi.setAttribute("class", "profile-det-info");
    piw.appendChild(pdi);
    let name = document.createElement("h3");
    name.innerHTML = getname(i);
    pdi.appendChild(name);
    let pd = document.createElement("div");
    pd.setAttribute("class", "patient-details");
    piw.appendChild(pd);
    let patid = document.createElement("h5");
    patid.innerHTML = "Patient ID : #SEPID" + String(getpatientid(i));
    pd.appendChild(patid);

    let l3 = document.createElement("li");
    l3.style.listStyle = "none";
    pd.appendChild(l3);
    let lm3 = document.createElement("i");
    lm3.setAttribute("class", "fas fa-map-marker-alt");
    l3.appendChild(lm3);
    let n3 = document.createElement("h5");
    n3.innerHTML = getaddress(i).split(/,(.*)/s)[0];
    l3.appendChild(n3);
    let n4 = document.createElement("h5");
    n4.innerHTML = getaddress(i).split(/,(.*)/s)[1];
    l3.appendChild(n4);
    let patinf = document.createElement("div");
    patinf.setAttribute("class", "patient-info");
    cardbody.appendChild(patinf);
    /*let ul = document.createElement('ul');
                patinf.appendChild(ul);*/

    let phone = document.createElement("li");
    phone.style.listStyle = "none";

    patinf.appendChild(phone);
    let phonespn = document.createElement("span");
    phonespn.innerHTML = "Phone :    " + String(getphone(i));
    phone.appendChild(phonespn);

    let gen = document.createElement("li");
    gen.style.listStyle = "none";

    patinf.appendChild(gen);
    let genspn = document.createElement("span");
    genspn.innerHTML = "Gender :    " + String(getgender(i));
    gen.appendChild(genspn);
    let bt = document.createElement("button");
    bt.addEventListener("click", function () {
      const patientId = getpatientid(i)
      getMyPatientsListRequest(patientId)
        .then((result) => {
        if (result.success === 1) {
          sessionStorage.setItem("myPatients", JSON.stringify(result.data))
          // location.href = "medical-record.html";
        } else {
          alert(result.message);
        }
    })
    .catch((error) => {
      alert(error);
    });

    });
    bt.innerHTML = "View Medical Records";
    patinf.appendChild(bt);

    const c = document.getElementsByClassName("container");
    c[0].appendChild(clmd);
  }
}
container();





