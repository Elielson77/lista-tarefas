const btnCriar = document.querySelector('.criar');
const listUl = document.querySelector('.lista-ul');
const tarefaInput = document.querySelector('.tarefa');

btnCriar.addEventListener('click', function(e){
  const tarefaTexto = tarefaInput.value; 
  console.log(tarefaTexto);
  limpaInput();
})

tarefaInput.addEventListener('keypress', function (e) {
  if(!tarefaInput.value){return}
  if (e.keyCode === 13) {
    tarefaTexto = tarefaInput.value;
    console.log(tarefaTexto); 
    limpaInput();
    criaTarefa(tarefaTexto);
    salvarTarefas();
  }
})
document.addEventListener('click', function(e){
  if(e.target.classList.contains('apagar')){
    e.target.parentElement.remove();
    salvarTarefas();
  }
})


function limpaInput(){
  tarefaInput.focus();
  tarefaInput.value = '';
}

function criaLi(){
  const li = document.createElement('li');
  return li
}

function criaTarefa(tarefa){
  const li = criaLi();
  li.innerHTML = tarefa; 
  criaApagar(li);
  listUl.appendChild(li)
}

function criaApagar(li){
  li.innerHTML += ' ';
  const btnApagar = document.createElement('button');
  btnApagar.setAttribute('class', 'apagar'); 
  btnApagar.innerHTML = 'Apagar';
  li.appendChild(btnApagar)
}

function salvarTarefas(){
  const listaTarefas = listUl.querySelectorAll('li');
  const tarefasarr = [];

  for(let i of listaTarefas){
    let tarefas = i.innerText;
    tarefas = tarefas.replace('Apagar', '').trim(); 
    tarefasarr.push(tarefas);
  }
  console.log(tarefasarr)

  const tarefasJSON = JSON.stringify(tarefasarr);
  localStorage.setItem('tarefas', tarefasJSON); 
}

function puxarTarefas(){
  const tarefasGuardadas = localStorage.getItem('tarefas');
  const tarefas = JSON.parse(tarefasGuardadas);

  for(let i of tarefas){
    criaTarefa(i);
  }
}
puxarTarefas();