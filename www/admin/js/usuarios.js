var roles = [
    {nombre: 'Administrador', Descripcion: 'Super usuario del sistema', Paginas: 'Todas' },
    {nombre: 'Usuario no registrado', Descripcion: 'Tendrá acceso a la pagina principal y a las páginas que estén registradas como públicas, encaso de visualizar alguna no podra hacer comentarios', Paginas:['Principal','publicas']},
    {nombre: 'Usuario registrado', Descripcion: 'Un usuario se puede registrar por su cuenta utilizando el rol genérico', Paginas: 'Varias' },
];

//Mostrar en una tabla las categorias existentes
(function mostrarRoles() {
    console.log(roles);
    roles.forEach(rol => {
        $('#tbl-roles').append(`
            <tr>
                <td>${rol.nombre}</td>
                <td>${rol.Descripcion}</td>
                <td>${rol.Paginas}</td>
                <td colspan="2"><a><i id="eliminar" class="far fa-trash-alt"></i></a><a><i id="editar" class="far fa-edit"></i></a></td>
            </tr>`
        );
    });
})();

(function llenarRolesUsuario(){
    roles.forEach(rol=>{
        $('#roles').append(
            `<option>${rol.nombre}</option>`
        );
    });
})();

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