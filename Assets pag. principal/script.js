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

function limparTarefas() {
    // Limpa todas as tarefas
    var taskLists = document.querySelectorAll("ul");
    taskLists.forEach(function(taskList) {
        taskList.innerHTML = "";
    });

}

