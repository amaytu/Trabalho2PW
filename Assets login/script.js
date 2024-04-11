document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("login");
    var usuarioInput = document.getElementById("usuario");
    var senhaInput = document.getElementById("senha");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var usuarioValue = usuarioInput.value.trim();
        var senhaValue = senhaInput.value.trim();

        if (usuarioValue.length < 5) {
            alert("O usuário deve ter pelo menos 5 caracteres.");
            return;
        }

        if (senhaValue.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        form.submit();
    });
});
