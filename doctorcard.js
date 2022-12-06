import { data } from "./Doctor.js";

function getname(number){
    return data[number]['doctor_name']
}
function getid(number){
    return data[number]['doctor_id']
}
function getgender(number){
    return data[number]['doctor_gender']
}
function getspecialty(number){
    return data[number]['doctor_speciality']
}
function getnumcards(){
    return Object.keys(data).length
}

//function hmtlify(){
/*export function filtername(){
    var input;
    input = document.getElementById('nameinput');
    namefilters = input.value;
    container(namefilters)

}*/
export function container(){
    
    var namefilters = document.getElementById('nameinput').value;
    var idfilters = document.getElementById('idinput').value;
    var specialityfilters = document.getElementById('specialityinput').value;

    var malefilter = $('#malecheckbox').is(':checked');
//    if(!malefilter){
     var   femalefilter = $('#femalecheckbox').is(':checked');
  //  }
    if(malefilter && femalefilter){
        alert('Please select up to one gender for the Doctor');
    }
    $(".container").html("");
for (let i = 0; i < getnumcards(); i++) {
    
    //alert(namefilters +" "+getname(i)+" "+(namefilters!='' && (getname(i).includes(namefilters))));
    if((namefilters!='' && (!getname(i).includes(namefilters))) 
    || (idfilters!='' && (getid(i)!=(idfilters)))
    || (specialityfilters!='' && (!getspecialty(i).includes(specialityfilters)))
    ||(malefilter && (getgender(i)!='Male'))
    ||(femalefilter && (getgender(i)!='Female'))
    )
       {continue}
    let card = $('<div/>').addClass('card').attr("id", "hour" + i);
       let cardbody = $('<div/>').addClass('card-body').attr("id", "hour" + i);
        card.append(cardbody);
            let docwid = $('<div/>').addClass('doctor-widget').attr("id", "hour" + i);
            cardbody.append(docwid);
                let docinfleft = $('<div/>').addClass('doc-info-left').attr("id", "hour" + i);
                    docwid.append(docinfleft);
                    let docimg = $('<div/>').addClass('doctor-img').attr("id", "hour" + i);
                        docinfleft.append(docimg);
                    let img = document.createElement("img");
                        img.setAttribute("src", "assets/img/doctors/generic_doctor.png");
                        img.setAttribute("height", "150");
                        img.setAttribute("width", "150");                   
                        docimg.append(img);
                    let docinfcont = $('<div/>').addClass('doc-info-cont').attr("id", "hour" + i);      
                    docinfleft.append(docinfcont);
                        let name = $('<h4/>').text(getname(i));
                            docinfcont.append(name);
                        let img2 = document.createElement("img");
                            img2.setAttribute("src", "assets/img/specialities/generic_medical_bag_2.jpg");
                            img2.setAttribute("height", "15");
                            img2.setAttribute("width", "15");
                            docinfcont.append(img2);
                        let specialty = $('<p/>').text(getspecialty(i)); 
                            specialty.fontSize="1";
                            //specialty.setAttribute("size","1");
                            docinfcont.append(specialty);
                       
                       
                    let rating = $('<div/>').addClass('rating').attr("id", "hour" + i);  
                    docinfleft.append(rating);
                        let s1 = $('<i/>');
                            s1.addClass ('fas fa-star filled');
                            rating.append(s1);
                        let s2 = $('<i/>');
                            s2.addClass ('fas fa-star filled');
                            rating.append(s2);
                        let s3 = $('<i/>');
                            s3.addClass ('fas fa-star filled');
                            rating.append(s3);
                        let s4 = $('<i/>');
                            s4.addClass ('fas fa-star filled');
                            rating.append(s4);
                        let s5 = $('<i/>');
                            s5.addClass ('fas fa-star');
                            rating.append(s5);
                        let sp = $('<p/>').text('(27)');    
                            sp.class = 'd-inline-block average-rating';
                            rating.append(sp);
                    let clindet = $('<div/>').addClass('clinic-details').attr("id", "hour" + i);                    
                    docinfcont.append(clindet);
                        let location = $('<p/>').text('Georgia, USA');
                        location.class = 'doc-location';
                        clindet.append(location);
                    let clinser = $('<div/>').addClass('clinic-services').attr("id", "hour" + i);                    
                    docinfcont.append(clinser);
                        let sp2 = $('<span/>').text('Dental Fillings');
                        clinser.append(sp2);
                        let sp3 = $('<span/>').text('Whitening');
                        clinser.append(sp3);
                    
                let docinfright = $('<div/>').addClass('doc-info-right').attr("id", "hour" + i);                    
                docwid.append(docinfright);
                    let clininf = $('<div/>').addClass('clini-infos').attr("id", "hour" + i);                    
                    docinfright.append(clininf);
                    let genderid = $('<small/>').text(getgender(i)); 
                    clininf.append(genderid);
                    let br = $('<br/>')
                    clininf.append(br);
                    let id = $('<small/>').text('Id #: '+getid(i)); 
                    clininf.append(id);
                        let l1 = $('<li/>').attr("id", "hour" + i);
                        l1.css('list-style', 'none');
                        clininf.append(l1);
                            let thumb = $('<i/>');
                                thumb.addClass('far fa-thumbs-up');
                            let n1 = $('<p/>').text("99%");
                                thumb.append(n1);
                                l1.append(thumb);

                                let l2 = $('<li/>').attr("id", "hour" + i);
                                l2.css('list-style', 'none');               
                                         clininf.append(l2);
                            /*let comment = $('<i/>');
                                comment.addClass('far fa-comment');
                            let n2 = $('<p/>').text("35 Feedback");
                                comment.append(n2);
                                l2.append(comment);
                            */
                                let l3 = $('<li/>').attr("id", "hour" + i);
                                l3.css('list-style', 'none');         
                                               clininf.append(l3);
                            let altloc = $('<i/>');
                                altloc.addClass('fas fa-map-marker-alt');
                                
                            let n3 = $('<p/>').text("Newyork, USA");
                            altloc.append(n3);
                            l3.append(altloc);
                            let l4 = $('<li/>').attr("id", "hour" + i);
                                l4.css('list-style', 'none');     
                                                   clininf.append(l4);
                            let money = $('<i/>');
                                money.addClass('far fa-money-bill-alt');
                            let n4 = $('<p/>').text("$300");
                            money.append(n4);
                            l4.append(money);

                    let clinbook = $('<div/>').addClass('clinic-services').attr("id", "hour" + i);                    
                    docinfright.append(clinbook);
                        let prof = document.createElement("a");
                        prof.setAttribute("href", "doctor-profile.html");
                            let link = document.createTextNode("View Profile");
                                prof.append(link); 
                        prof.class = 'view-pro-btn';
                        clinbook.append(prof);
                    let clinbookapt = $('<div/>').addClass('clinic-services-apt').attr("id", "hour" + i);                    
                        docinfright.append(clinbookapt);                       
                        let apt = document.createElement("a");
                        apt.setAttribute("href", "booking.html");
                            let link2 = document.createTextNode("Book Appointment");
                                apt.append(link2);
                        apt.class = 'apt-btn';
                        clinbookapt.append(apt);

     $(".container").append(card);
}
   }
container()
//export {filtername}
window.data=data


