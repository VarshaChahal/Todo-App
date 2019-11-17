$( function() {
    $( "#datepicker" ).datepicker();
  } );

const btn = document.querySelector('#add');
const task = document.querySelector('#task');
const date = document.querySelector('#datepicker');
const table = document.getElementById('todo-items');

(function listeners(){

  table.addEventListener('click',removeElement);
//console.log(btn.previousElementSibling);
btn.addEventListener('click',addTask);
document.addEventListener('DOMContentLoaded',localStorageOnLoad);
})();

function addTask(e){
  
  e.preventDefault();
  let taskInput = task.value;
  let dt= date.value;
 let dateInput = new Date(dt).toDateString();
 
  if(dateInput === "Invalid Date"){
    dateInput = "No deadline";
  }
   let today = new Date();

  if(new Date(dateInput) < today){
  dateLess();
    
  }
  else{ 
    if(taskInput !== "" && dateInput !== "Invalid Date"){
            addToTable(taskInput,dateInput);
            let arr = [taskInput,dateInput];
            addToLocalStorage(arr);
  }
  }
  let form = document.querySelector('form');
  let ip1 = form[0];
  let ip2 =form[1];
  ip1.value = "";
  ip2.value = "";
}

function addToTable(taskInput,dateInput){

  let tr = document.createElement('tr');
  let td = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  
  let taskVal = document.createTextNode(taskInput);
  let dateVal = document.createTextNode(dateInput);
  let i = document.createElement('i');
  i.classList = 'delete fa fa-trash-o fa-2x';
  td.appendChild(taskVal);
  td1.appendChild(dateVal);
  td2.appendChild(i);
  tr.appendChild(td);
  tr.appendChild(td1);
  tr.appendChild(td2);
  
  let tab = document.getElementById('todo-items');
 // console.log(tab.children[1]);
  let tableBody = tab.children[0];
  tableBody.appendChild(tr);
 
}


function removeElement(e){
  if(e.target.classList.contains('delete')){
   // console.log("you clicked the delete button");
    //console.log(e.target.parentElement.parentElement);
    let tr = e.target.parentElement.parentElement;
   
     //removeFromLocalStorage(tr.children[0].textContent);
    tr.remove();
    removeFromLocalStorage(tr.children[0].textContent);
   
  }
}
function dateLess(){

    let alrt = document.createElement('div');
  console.log(alrt);
    let strong = document.createElement('strong');

    let text = document.createTextNode("Can't time-travel to the past, Check the date");
    let a = document.createElement('a');
 
    let x = document.createTextNode('x');
   a.href = '#';
    a.classList = 'close';
    a.appendChild(x);
    
    strong.appendChild(text);
  console.log(strong);
    alrt.classList = 'alert alert-danger alert-dismissible';
    alrt.append(a);
    alrt.appendChild(strong);
//  console.log(alrt);
    let div = document.getElementById('alertBox');
  div.style.margin = "auto";
  div.style.paddingTop = "30px";
  div.appendChild(alrt);
  a.addEventListener('click',function(){
    div.children[0].remove();
    
  });
  
}

function localStorageOnLoad(){
  let data= getFromLocalStorage();
  data.forEach(val =>{
    addToTable(val[0],val[1]);
  });
}
function addToLocalStorage(array){
     let arrLS = getFromLocalStorage();
      arrLS.push(array);
      localStorage.setItem('table',JSON.stringify(arrLS));
}
function getFromLocalStorage(){
  let data;
  data = localStorage.getItem('table');
  if(data == null){
    data = [];
  }
  else{
    data = JSON.parse(localStorage.getItem('table'));
  }
  return data;
}
function removeFromLocalStorage(taskName){
  
  let data = getFromLocalStorage();
  console.log(data[0]);
  data.forEach((val,index) => {
    if(taskName == val[0]){
      data.splice(index,1);
    }
  });
  localStorage.setItem('table',JSON.stringify(data));
  
}