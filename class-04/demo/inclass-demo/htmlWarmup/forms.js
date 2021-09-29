

//Event Listener
//Callback to handle the event
//handleSubmit name

//DOM manipulation. append child, getelementbyId...........
let headerEl = document.getElementById('nameHeader');

let myFormEl = document.getElementById('myForm');

function handleSubmit(e) {
  e.preventDefault();
  console.log('Submitted');
}

myFormEl.addEventListener('input', e => {
  headerEl.innerText = `Welcome, ${e.target.value}!`
})


myFormEl.addEventListener('submit', handleSubmit);



