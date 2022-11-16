import { appointmentsState } from "./StateManagement.js";
let pay  = document.getElementById('pay');

pay.onclick = function(){myFunction()}
function myFunction(){
    console.log('clicked')
    console.log(appointmentsState);
}