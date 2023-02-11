document.addEventListener('DOMContentLoaded',function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }

    // si usas tailwid ejecuta este codigo ya que hace que se cargue primero todo el html


    // seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    // asignar evento
    // inputEmail.addEventListener('blur',validar);

    // blur es para cuando se sale de input o mejor dicho sales de ese campo
    // input es para una validacion en tiempo real
    inputEmail.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    function validar(e) {
        // para avanzar al siguiente elmento usa netxElementSibling
        // console.log(e.target.parentElement.nextElementSibling);
        // trim elelimina los espacios en blanco es importante usarlo en un formmulario
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio *`, e.target.parentElement);
            email[e.target.id] = '';
            // jej era name pero yo los puse con un id
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
            // console.log('si hay algo');

        // asignar los valores del objeto email
        email[e.target.id] = e.target.value.trim().toLowerCase();

        // comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);

        // comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.p-error');
        if(alerta){
            alerta.remove()
        }
        // generar una alerta en HTML
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('p-error')
        
        // inyectar error en el formulario
        referencia.appendChild(error)

        // otra forma de inyectar html pero que limpia todo el contenido
        // formmulario.innerHTML = error.innerHTML
    }
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.p-error');
        if(alerta){
            alerta.remove()
        };
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        
        if (Object.values(email).includes('')){
            btnSubmit.setAttribute("style","opacity: 50%");
            btnSubmit.disabled = true;
            return
        
        } 
            btnSubmit.setAttribute("style","opacity: 100%");
            btnSubmit.disabled = false;
        
    }
});



