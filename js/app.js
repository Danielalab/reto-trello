// funcion para añadir eventos al cargar la ventana
window.onload = function () {
  var form = document.getElementById('style-form');
  var iconExit = document.getElementById('icon-exit');
  var nameList = document.getElementById('name-list');  
  form.addEventListener('click', styleMoreOptions);
  iconExit.addEventListener('click', removeStyle);
  nameList.addEventListener('keyup', addEventButtonSaveList);
}

// seleciona nodo para añadir lista
var divAddList = document.getElementById('add-list');

// función: mostrar opciones para crear lista 
function styleMoreOptions() {
  divAddList.classList.add('more-options');
}

// quita visualización de opciones para crear lista
function removeStyle() {
  document.getElementById('name-list').value = '';
  divAddList.classList.remove('more-options');
}

// añade evento al boton para guardar nombre de lista
function addEventButtonSaveList() {
  var buttonSaveList = document.getElementById('btn-save');
  buttonSaveList.addEventListener('click', createList);  
}

//funcion para crear lista
function createList() {
  var nameList = document.getElementById('name-list').value;
  if (checkText(nameList)) {
    divAddList.classList.add('no-padding');
    divAddList.innerHTML = '<div class="create-list"><span>' + nameList + '</span></div> <div class="create-list" id="add-card"><a>Añadir una tarjeta...</a></div>';
    addCard () ;
  } else {
    this.removeEventListener('click', createList);    
  }
}

// evento al boton añadir tarjeta
function addCard() {
  var addCard = document.getElementById('add-card');
  addCard.addEventListener('click', writeCard);
}

// funcion que muestra espacio para escribir una tarjeta 
function writeCard() {
  this.style.display="none";
  var form = document.createElement('form');
  var divMoreOptions = document.createElement('div');
  form.id = 'form';
  divMoreOptions.id = 'div-more-options';  
  form.innerHTML='<textarea id="text-card"></textarea>';
  divMoreOptions.innerHTML = '<button  id="btn-add" type="submit">Añadir</button><span id="icon-exit"><i class="fa fa-times" aria-hidden="true"></i></span> ';
  form.setAttribute('class','style-write-card');
  divMoreOptions.setAttribute('class','style-div');
  divAddList.appendChild(form);
  divAddList.appendChild(divMoreOptions);
  var exit = document.getElementById('icon-exit');
  var textCard = document.getElementById('text-card');
  textCard.addEventListener('keyup',addEventButtonAdd);  
  exit.addEventListener('click', deleteFormAndDiv);  
}

// añade evento al boton 'añadir'  
function addEventButtonAdd () {
  var buttonAdd = document.getElementById('btn-add');
  buttonAdd.addEventListener('click', saveCard);
}

// para guardar el texto que irá en la tarjeta a crear
function saveCard() {
  var textCard = document.getElementById('text-card').value;
  if (checkText(textCard)) {
    var cardContainer = document.createElement('div');
    var addCard = document.getElementById('add-card');  
    cardContainer.innerHTML = '<p>' + textCard + '</p>';
    cardContainer.setAttribute('class','style-card-container');
    divAddList.insertBefore(cardContainer,addCard);
    deleteFormAndDiv (); 
  }  else {
    buttonAdd.removeEventListener('click',saveCard);    
  }
}

// funcion que quita opciones de añadir tarjeta y regresa a una visualización anterior
function deleteFormAndDiv() {
  var selectForm = document.getElementById('form');
  var selectDivMoreOptions = document.getElementById('div-more-options');
  var addCard = document.getElementById('add-card');
  selectForm.parentNode.removeChild(selectForm);
  selectDivMoreOptions.parentNode.removeChild(selectDivMoreOptions);
  addCard.style.display="block";  
}

// funcion que verifica que no exista texto vacio 
function checkText(array) {
  for (var index = 0; index < array.length; index++) {
    if (array[index] !== ' ' && array.charCodeAt(index) !== 10 ) {
      return true;
    }
  }
}

