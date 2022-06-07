window.onload = function() {
    
    // Validar el Submit
    document.getElementById("formulario").addEventListener('submit', validar);

    // Variables
    var nombre = document.getElementById('nombre');
    var error_nombre = document.getElementById('error_nombre');
    var apellido = document.getElementById('apellido');
    var error_apellido = document.getElementById('error_apellido');
    var mail = document.getElementById('mail');
    var error_mail = document.getElementById('error_mail');
    var edad = document.getElementById('edad');
    var error_edad = document.getElementById('error_edad');
    var sexo = document.getElementsByName('sexo');
    var error_sexo = document.getElementById('error_sexo');
    var temas = document.getElementsByName('temas');
    var error_temas = document.getElementById('error_temas');
    var temas_seleccionados = document.getElementsByName("temas");
    var numRegex =/^[0-9]+$/;
    var mailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var modal_ok = [];

    // Validaciones
    function validar(evento){
        evento.preventDefault();
        setear_obligatorios(nombre);
        setear_obligatorios(apellido);
        setear_obligatorios(mail);
        setear_obligatorios(edad);
        setear_obligatorios_radio(sexo);
        longitud(nombre,error_nombre);
        longitud(apellido,error_apellido);
        validar_mail(mail,error_mail);
        validar_edad(edad,error_edad);
        validar_sexo(sexo,error_sexo);
        validar_temas(temas_seleccionados,error_temas);
        validar_modal(modal_ok);
    }

    // Función para setear obligatorios
    function setear_obligatorios(x){
        x.setAttribute('required','true');
    }
    function setear_obligatorios_radio(x){
        var long_array = x.length;
        var i = 0;
        for(i; i<long_array;i++){
            x[i].setAttribute('required','true');
        }
    }
    // Funciones de validaciones
    function longitud(x,y){
        if(numRegex.test(x.value)){
            y.classList.remove('esconder_error');
        }else{
            if(x.value.length < 3 || x.value.length > 15){
                y.classList.remove('esconder_error');
                modal_ok[0]=false;
            }else{
                modal_ok[0]=true;
            }
        }
    }
    function validar_mail(x,y){
        if (!mailRegex.test(x.value)) {
            y.classList.remove('esconder_error');
            modal_ok[1]=false;
        }else{
            modal_ok[1]=true;
        }
    }
    function validar_edad(x,y){
        if(x.value < 18 || x.value > 120 || !numRegex.test(x.value)){
            y.classList.remove('esconder_error');
            modal_ok[2]=false;
        }else{
            modal_ok[2]=true;
        }
    }
    function validar_sexo(x,y) {
        if ((x[0].checked == false) && (x[1].checked == false)){
            y.classList.remove('esconder_error');
            modal_ok[3]=false;
        }else{
            modal_ok[3]=true;
        }
    }
    function validar_temas(x,y){
        var long_array = x.length;
        var i = 0;
        var b = 0;
        for(i; i<long_array;i++){
            if(x[i].checked == false){
                b++;
            }
        }
        if(b == long_array){
            y.classList.remove('esconder_error');
            modal_ok[4]=false;
        }else{
            modal_ok[4]=true;
        }
    }
    function validar_modal(x){
        var long_array = x.length;
        var i = 0;
        var b = 0;
        for(i; i<long_array; i++){
            if(x[i] == true){
                b++;
            }
        }
        if(b == long_array){
            modal.style.display="block";
            b=0;
        }
    }

    // Eventos para "limpiar" errores
    nombre.addEventListener('focus',limpiar_error);
    apellido.addEventListener('focus', limpiar_error);
    mail.addEventListener('focus',limpiar_error);
    edad.addEventListener('focus',limpiar_error);
    sexo.forEach(sexo => sexo.addEventListener('change', limpiar_error));
    temas.forEach(temas => temas.addEventListener('change', limpiar_error));

    // Función para limpiar error
    function limpiar_error(){
        var error_activo = "error_" + document.activeElement.name;
        var er = document.getElementById(error_activo);
        er.classList.add('esconder_error');
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
}