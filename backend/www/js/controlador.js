
//Pinta los campos si se dejan vacios para advertir al usuario
function colorear(elemento) {
    if (elemento.value == '') {
        $(elemento).removeClass('Ok');
        $(elemento).addClass('error');
        console.log('error')
    } else {
        $(elemento).removeClass('error');
        $(elemento).addClass('Ok');
    }

}

var users = [
    {user: 'admin1', pass: 'admin1'}, {user:'usnore', pass:'usnore'}, {user:'usre', pass:'usre'}
];

//Registro
function login(){
    let user = $('#email').val();
    let pass = $('#pass1').val();
    document.getElementById('username').value = user;
    $('#pass').val(pass);
}

