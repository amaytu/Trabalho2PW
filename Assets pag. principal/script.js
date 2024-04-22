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
//excluir daqui pra baixo se nao der certo
function limparTarefas() {
    // Limpa todas as tarefas
    var taskLists = document.querySelectorAll("ul");
    taskLists.forEach(function(taskList) {
        taskList.innerHTML = "";
    });
}

function salvarTarefas() {
    // Obtém todas as listas de tarefas
    var taskLists = document.querySelectorAll("ul");

    // Cria um objeto para armazenar as tarefas de cada lista
    var tasksObj = {};

    // Itera sobre cada lista de tarefas
    taskLists.forEach(function(taskList) {
        // Obtém o identificador da lista de tarefas
        var identificador = taskList.getAttribute("id");

        // Obtém todas as tarefas dentro da lista
        var tasks = taskList.getElementsByTagName("li");

        // Cria um array para armazenar as tarefas da lista atual
        var tasksArray = [];

        // Itera sobre cada tarefa da lista atual
        for (var i = 0; i < tasks.length; i++) {
            // Adiciona o texto da tarefa ao array de tarefas
            tasksArray.push(tasks[i].textContent);
        }

        // Armazena o array de tarefas no objeto tasksObj usando o identificador como chave
        tasksObj[identificador] = tasksArray;
    });

    // Converte o objeto tasksObj em uma string JSON
    var tasksJSON = JSON.stringify(tasksObj);

    // Armazena a string JSON no localStorage com a chave 'tasks'
    localStorage.setItem('tasks', tasksJSON);
    
    alert("Tarefas salvas com sucesso!");
}

// Define a função para carregar tarefas
function carregarTarefas() {
    // Verifica se há tarefas armazenadas no localStorage
    if(localStorage.getItem('tasks')) {
        // Obtém as tarefas armazenadas do localStorage
        var tasksJSON = localStorage.getItem('tasks');

        // Converte a string JSON de volta para um objeto
        var tasksObj = JSON.parse(tasksJSON);

        // Itera sobre cada lista de tarefas no objeto tasksObj
        for(var identificador in tasksObj) {
            if(tasksObj.hasOwnProperty(identificador)) {
                // Obtém a lista de tarefas correspondente ao identificador
                var taskList = document.getElementById(identificador);

                // Obtém o array de tarefas correspondente ao identificador
                var tasksArray = tasksObj[identificador];

                // Itera sobre cada tarefa no array de tarefas
                tasksArray.forEach(function(taskText) {
                    // Cria um novo elemento li para a tarefa
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(taskText));

                    // Adiciona a tarefa à lista de tarefas
                    taskList.appendChild(li);

                    // Adiciona o evento de marcação de tarefa como concluída ao clicar
                    li.onclick = function() {
                        li.classList.toggle("completed");
                    };

                    // Cria o botão de remover tarefa
                    var removeButton = document.createElement("button");
                    removeButton.innerHTML = "Remove";
                    removeButton.onclick = function() {
                        li.remove();
                        salvarTarefas(); // Após remover a tarefa, salva as atualizações
                    };
                    li.appendChild(removeButton);

                    // Cria o botão de editar tarefa
                    var editButton = document.createElement("button");
                    editButton.innerHTML = "Edit";
                    editButton.onclick = function() {
                        var newText = prompt("Edit task:", li.textContent.trim());
                        if (newText !== null && newText !== "") {
                            li.firstChild.textContent = newText;
                            salvarTarefas(); // Após editar a tarefa, salva as atualizações
                        }
                    };
                    li.appendChild(editButton);
                });
            }
        }
    }
}

// Chama a função para carregar tarefas quando o DOM é carregado
document.addEventListener("DOMContentLoaded", carregarTarefas);
