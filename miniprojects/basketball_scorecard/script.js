let button1H = document.getElementById("button+1H");
let button2H = document.getElementById("button+2H");
let button3H = document.getElementById("button+3H");

let button1C = document.getElementById("button+1C");
let button2C = document.getElementById("button+2C");
let button3C = document.getElementById("button+3C");

let home = document.getElementById("home");
let guest = document.getElementById("guest");

let guest_counter = 0;
let home_counter = 0;

home.innerText = home_counter;
guest.innerText = guest_counter;
function incrementby1(val) {
  return val + 1;
}
function incrementby2(val) {
  return val + 2;
}
function incrementby3(val) {
  return val + 3;
}
//these are the same thing
// function (){
// }
// ()={
// }
button1H.addEventListener("click", function () {
  home_counter = incrementby1(home_counter);
  home.innerText = home_counter;
});

button1C.addEventListener("click", () => {
  guest_counter = incrementby1(guest_counter);
  guest.innerText = guest_counter;
});

button2H.addEventListener("click", () => {
  home_counter = incrementby2(home_counter);
  home.innerText = home_counter;
});

button2C.addEventListener("click", () => {
  guest_counter = incrementby2(guest_counter);
  guest.innerText = guest_counter;
});

button3H.addEventListener("click", () => {
  home_counter = incrementby3(home_counter);
  home.innerText = home_counter;
});

button3C.addEventListener("click", () => {
  guest_counter = incrementby3(guest_counter);
  guest.innerText = guest_counter;
});
