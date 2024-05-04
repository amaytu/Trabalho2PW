function verificarCaracteresEmail(input) {
    var mensagemErro = document.getElementById('mensagemErroEmail');
    if (input.value.length < 6) {
        mensagemErro.textContent = "Insira um email válido.";
    } else {
        mensagemErro.textContent = "";
    }
}

function verificarCaracteresUser(input) {
    var mensagemErro = document.getElementById('mensagemErroUser');
    if (input.value.length < 6) {
        mensagemErro.textContent = "O usuário deve ter no mínimo 6 caracteres.";
    } else {
        mensagemErro.textContent = "";
    }
}

function verificarCaracteresPassword(input) {
    var mensagemErro = document.getElementById('mensagemErroPassword');
    if (input.value.length < 8) {
        mensagemErro.textContent = "A senha deve ter no mínimo 8 caracteres.";
    } else {
        mensagemErro.textContent = "";
    }
}
