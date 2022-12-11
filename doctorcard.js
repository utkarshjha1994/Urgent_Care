import { data } from "./Doctor.js";

function getname(number) {
  return data[number]["doctor_name"];
}
function getid(number) {
  return data[number]["doctor_id"];
}
function getgender(number) {
  return data[number]["doctor_gender"];
}
function getspecialty(number) {
  return data[number]["doctor_speciality"];
}
function getnumcards() {
  return Object.keys(data).length;
}

//function hmtlify(){
/*export function filtername(){
    var input;
    input = document.getElementById('nameinput');
    namefilters = input.value;
    container(namefilters)

}*/
export function container() {
  var namefilters = document.getElementById("nameinput").value;
  var idfilters = document.getElementById("idinput").value;
  var specialityfilters = document.getElementById("specialityinput").value;

  var malefilter = $("#malecheckbox").is(":checked");
  //    if(!malefilter){
  var femalefilter = $("#femalecheckbox").is(":checked");
  //  }
  if (malefilter && femalefilter) {
    alert("Please select up to one gender for the Doctor");
  }
  $(".container").html("");
  for (let i = 0; i < getnumcards(); i++) {
    //alert(namefilters +" "+getname(i)+" "+(namefilters!='' && (getname(i).includes(namefilters))));
    if (
      (namefilters != "" && !getname(i).includes(namefilters)) ||
      (idfilters != "" && getid(i) != idfilters) ||
      (specialityfilters != "" &&
        !getspecialty(i).includes(specialityfilters)) ||
      (malefilter && getgender(i) != "Male") ||
      (femalefilter && getgender(i) != "Female")
    ) {
      continue;
    }

    let card = $("<div/>")
      .addClass("card")
      .attr("id", "hour" + i);
    let cardbody = $("<div/>")
      .addClass("card-body")
      .attr("id", "hour" + i);
    card.append(cardbody);
    let docwid = $("<div/>")
      .addClass("doctor-widget")
      .attr("id", "hour" + i);
    cardbody.append(docwid);
    let docinfleft = $("<div/>")
      .addClass("doc-info-left")
      .attr("id", "hour" + i);
    docwid.append(docinfleft);
    let docimg = $("<div/>")
      .addClass("doctor-img")
      .attr("id", "hour" + i);
    docinfleft.append(docimg);
    let img = document.createElement("img");
    img.setAttribute("src", "assets/img/generic_doctor.png");
    img.setAttribute("height", "150");
    img.setAttribute("width", "150");
    docimg.append(img);
    let docinfcont = $("<div/>")
      .addClass("doc-info-cont")
      .attr("id", "hour" + i);
    docinfleft.append(docinfcont);
    let name = $("<h4/>").text(getname(i));
    docinfcont.append(name);
    // let img2 = document.createElement("img");
    // img2.setAttribute(
    //   "src",
    //   "assets/img/specialities/generic_medical_bag_2.jpg"
    // );
    // img2.setAttribute("height", "15");
    // img2.setAttribute("width", "15");
    // docinfcont.append(img2);
    let specialty = $("<p/>").text(getspecialty(i).toUpperCase());
    specialty.fontSize = "1";
    //specialty.setAttribute("size","1");
    docinfcont.append(specialty);

    let clindet = $("<div/>")
      .addClass("clinic-details")
      .attr("id", "hour" + i);
    docinfcont.append(clindet);

    let clinser = $("<div/>")
      .addClass("clinic-services")
      .attr("id", "hour" + i);
    docinfcont.append(clinser);

    let docinfright = $("<div/>")
      .addClass("doc-info-right")
      .attr("id", "hour" + i);
    docwid.append(docinfright);
    let clininf = $("<div/>")
      .addClass("clini-infos")
      .attr("id", "hour" + i);
    docinfright.append(clininf);
    let genderid = $("<p/>").text(getgender(i));

    clininf.append(genderid);

    let id = $("<p/>").text("#SEDID: " + getid(i));
    clininf.append(id);
    let l1 = $("<li/>").attr("id", "hour" + i);
    l1.css("list-style", "none");
    clininf.append(l1);
    let thumb = $("<i/>");
    thumb.addClass("far fa-thumbs-up");
    thumb.css("display", "inline-block");
    thumb.css("margin-right", "10px");
    thumb.append("&nbsp; &nbsp;");

    // let n1 = $('<p/>').text(" 99%");
    //     n1.css('display', 'inline-block')

    //     thumb.append(n1);

    //     l1.append(thumb);

    /*  let l2 = $('<li/>').attr("id", "hour" + i);
                                l2.css('list-style', 'none');               
                                         clininf.append(l2);
                            let comment = $('<i/>');
                                comment.addClass('far fa-comment');
                            let n2 = $('<p/>').text("35 Feedback");
                                comment.append(n2);
                                l2.append(comment);
                            */
    let l3 = $("<li/>").attr("id", "hour" + i);
    l3.css("list-style", "none");
    clininf.append(l3);
    let altloc = $("<i/>");
    // altloc.addClass('fas fa-map-marker-alt');
    altloc.css("display", "inline-block");
    altloc.css("margin-right", "10px");
    //let sp1 = $('<p/>').text("&nbsp;");
    //sp1.css('display', 'inline-block')

    altloc.append("&nbsp; &nbsp;");

    l3.append(altloc);
    let l4 = $("<li/>").attr("id", "hour" + i);
    l4.css("list-style", "none");
    clininf.append(l4);
    // let money = $("<i/>");
    // money.addClass("far fa-money-bill-alt");
    // money.css("display", "inline-block");
    // money.css("margin-right", "10px");
    // money.append("&nbsp; &nbsp;");

    let clinbook = $("<div/>")
      .addClass("clinic-services")
      .attr("id", "hour" + i);
    docinfright.append(clinbook);
    let prof = document.createElement("a");
    // prof.setAttribute("href", "doctor-profile.html?"+id+"&");
    //    let link = document.createTextNode("View Profile");
    //     prof.append(link);
    // prof.class = 'view-pro-btn';
    //   clinbook.append(prof);
    let clinbookapt = $("<div/>")
      .addClass("clinic-services-apt")
      .attr("id", "hour" + i);
    docinfright.append(clinbookapt);
    let apt = document.createElement("button");
    // apt.addClass('btn', 'btn-primary')
    //   apt.setAttribute("href", "booking.html?"+JSON.stringify(data));
    apt.addEventListener("click", function () {
      let userDetails = sessionStorage.getItem("userDetails")
          if (userDetails === null) {
            alert("To book an appointment, please log in!")
            window.location = "login.html"
          } else {
            book();
          }
    });
    apt.innerHTML = "Book an Appointment";

    function book() {
      sessionStorage.setItem("bookingDoctorID", getid(i));

      sessionStorage.setItem("bookingDoctorName", getname(i));

      sessionStorage.setItem("bookingDoctorSpeciality", getspecialty(i));
      window.open("booking.html");
    }

    apt.className = "btn btn-primary btn-block btn-lg login-btn";
    clinbookapt.append(apt);

    $(".container").append(card);
  }
}
container();
//export {filtername}
window.data = data;
