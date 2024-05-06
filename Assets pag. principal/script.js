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

document.addEventListener('DOMContentLoaded', function() {
    carregarTarefasSalvas();
});

function salvarTodasTasks() { 
    salvarTasks('g'); 
    salvarTasks('f'); 
    salvarTasks('m'); 
}

function salvarTasks(identificador) { 
    var taskList = {};

    if (identificador == 'g') { 
        taskList = document.getElementById("taskListGeral"); 
    } else if (identificador == 'f') { 
        taskList = document.getElementById("taskListFaculdade"); 
    } else if (identificador == 'm') { 
        taskList = document.getElementById("taskListMercado"); 
    } else {
        console.error("Identificador inválido:", identificador);
        return;
    }

    var taskItems = taskList.children;
    var tasksArray = [];

    for (var i = 0; i < taskItems.length; i++) {
        var task = taskItems[i];
        var taskText = Array.from(task.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent.trim())
            .join("");
        
        tasksArray.push({
            id: uuidv4(),
            content: taskText, // Salva apenas o texto da tarefa
            completed: task.classList.contains('completed')
        });
    }

    localStorage.setItem(identificador, JSON.stringify(tasksArray));
}

function carregarTarefasSalvas() {
    carregarTasksSalvas('g');
    carregarTasksSalvas('f');
    carregarTasksSalvas('m');
}

function carregarTasksSalvas(identificador) {
    var savedTasks = localStorage.getItem(identificador);

    if (!savedTasks) return;

    var taskList = {};

    if (identificador == 'g') { 
        taskList = document.getElementById("taskListGeral"); 
    } else if (identificador == 'f') { 
        taskList = document.getElementById("taskListFaculdade"); 
    } else if (identificador == 'm') { 
        taskList = document.getElementById("taskListMercado"); 
    } else {
        console.error("Identificador inválido:", identificador);
        return;
    }

    var tasksArray = JSON.parse(savedTasks);

    tasksArray.forEach(task => {
        var li = document.createElement("li");
        li.textContent = task.content;
        if (task.completed) {
            li.classList.add('completed');
        }

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
            var newText = prompt("Edit Task", li.textContent.trim());
            if (newText !== null && newText !== "") {
                li.textContent = newText;
            }
        };
        li.appendChild(editButton);

        taskList.appendChild(li);
    });
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

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}
