
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