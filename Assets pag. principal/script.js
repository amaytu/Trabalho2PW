function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }
  
  function addTask(identificador) {
    var taskInput = {};
    var taskList = {};

    if (identificador == 'g') {
        taskInput = document.getElementById("taskInputGeral");
        taskList = document.getElementById("taskListGeral");
    } else if (identificador == 'f') {
        taskInput = document.getElementById("taskInputFaculdade");
        taskList = document.getElementById("taskListFaculdade");
    } else {
        taskInput = document.getElementById("taskInputMercado");
        taskList = document.getElementById("taskListMercado");
    }

    if (taskInput.value === "") {
        alert("Please enter a task.");
        return;
    }

    var li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));
    taskList.appendChild(li);

    taskInput.value = "";

    li.onclick = function() {
        li.classList.toggle("completed");
    };

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = function() {
        li.remove();
    };
    li.appendChild(removeButton);

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function() {
        var newText = prompt( li.textContent.trim());
        if (newText !== null && newText !== "") {
            li.firstChild.textContent = newText;
        }
    };
    li.appendChild(editButton);
}

function limparTasks(identificador) {
    var taskList = {};

    if (identificador == 'g') {
        taskList = document.getElementById("taskListGeral");
    } else if (identificador == 'f') {
        taskList = document.getElementById("taskListFaculdade");
    } else {
        taskList = document.getElementById("taskListMercado");
    }

    // Remove cada item da lista
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function limparTodasTasks() {
    limparTasks('g');
    limparTasks('f');
    limparTasks('m');
}

function salvarTasks(identificador) { 
    var taskList = {};

    if (identificador == 'g') { 
        taskList = document.getElementById("taskListGeral"); 
    } else if (identificador == 'f') { 
        taskList = document.getElementById("taskListFaculdade"); 
    } else { 
        taskList = document.getElementById("taskListMercado"); 
    }

    var currentTask = taskList.firstChild; // Começa com o primeiro filho

    while (currentTask) {
        localStorage.setItem(currentTask.id, currentTask.innerText);
        currentTask = currentTask.nextSibling; // Avança para o próximo filho
    }
}

function salvarTodasTasks() { 
    salvarTasks('g'); 
    salvarTasks('f'); 
    salvarTasks('m'); 
}


