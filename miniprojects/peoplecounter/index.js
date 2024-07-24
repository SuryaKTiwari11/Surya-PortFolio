let counterElement = document.getElementById("count");
let counterButton = document.getElementById("increment-btn");
let saveButton = document.getElementById("save-btn");
let paraContent = document.getElementById("save-el");
let counter = 0;
function incrementCounter() {
  console.log(counter);
  counterElement.innerText = counter;
  counter++;
}
function fSaveButton() {

//   let prev = counter + "- "
paraContent.innerText = paraContent.innerText + counter + " - ";
counter = 0;    

}
counterButton.addEventListener("click", incrementCounter);
saveButton.addEventListener("click", fSaveButton);


function error1(){
    paraContent.innerText = "something is wrong";
}