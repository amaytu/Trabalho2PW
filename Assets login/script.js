document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("login");
    var emailInput = document.getElementById("email");
    var usuarioInput = document.getElementById("usuario");
    var senhaInput = document.getElementById("senha");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var emailInput = emailInput.value.trim();
        var usuarioValue = usuarioInput.value.trim();
        var senhaValue = senhaInput.value.trim();

        if (!validateEmail(emailInput)) {
            alert("Por favor, insira um email válido.");
            return;
        }
        
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

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let radioButtons = document.querySelectorAll('input[type="radio"]');

    radioButtons.forEach((radioButton) => {
        radioButton.addEventListener('click', () => {
            if (radioButton.checked) {
            radioButtons.forEach((otherRadioButton) => {
                if (otherRadioButton!= radioButton) {
                otherRadioButton.checked = false;
                }
            });
            }
        });
    });
});


