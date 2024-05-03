const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/*validador rut */
document.getElementById('contacto-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var rut = document.getElementById('rut').value.trim();


    if (rut === '') {
        mostrarResultado('Debes ingresar un RUT', 'red');
        return;
    }


    rut = rut.replace(/\./g, '').replace(/\-/g, '').toUpperCase();


    var rutSinDigito = rut.slice(0, -1);
    var digitoVerificador = rut.slice(-1);


    var suma = 0;
    var multiplo = 2;
    for (var i = rutSinDigito.length - 1; i >= 0; i--) {
        suma += parseInt(rutSinDigito.charAt(i)) * multiplo;
        if (multiplo < 7) multiplo++;
        else multiplo = 2;
    }
    var resto = suma % 11;
    var dvEsperado = 11 - resto;
    if (dvEsperado === 11) dvEsperado = 0;
    else if (dvEsperado === 10) dvEsperado = 'K';

    if (digitoVerificador === dvEsperado.toString()) {
        mostrarResultado('RUT válido', 'green');
    } else {
        mostrarResultado('RUT inválido', 'red');
    }
});

function mostrarResultado(mensaje, color) {
    var resultado = document.getElementById('resultado');
    resultado.textContent = mensaje;
    resultado.style.color = color;
}

/*valida si se rellenaron todas las casillas del formulario*/
document.getElementById('contacto-form').addEventListener('submit', function(event) {
    var form = event.target;
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    form.classList.add('was-validated');
});

document.getElementById('contacto-form').addEventListener('submit', function(event) {
    var form = event.target;
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        // Iterar sobre los elementos del formulario para mostrar los mensajes de error
        var elements = form.elements;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (!element.validity.valid) {
                    var errorSpan = document.getElementById(element.id + '-error');
                    if (errorSpan) {
                        errorSpan.style.display = 'inline-block';
                    }
                }
            }
        }
    }
    form.classList.add('was-validated');
});

// Ocultar los mensajes de error al cambiar el valor de los campos
var inputElements = document.querySelectorAll('input, textarea');
inputElements.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
        var errorSpan = document.getElementById(this.id + '-error');
        if (errorSpan) {
            errorSpan.style.display = 'none';
        }
    });
});
