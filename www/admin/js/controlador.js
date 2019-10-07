$(document).ready(function () {
    llenarTablaCategorias();
});

var categorias_media = ['Imagenes', 'Videos', 'Archivos genéricos'];

(function llenarCategorias() {
    for (i = 0; i < categorias_media.length; i++) {
        $('#selectCat').append(`<option value="${categorias_media[i]}">${categorias_media[i]}</option>`);
    }
})();

// var src_imagenes = ['../img/1.webp', '../img/2.webp', '../img/3.webp', '../img/4.webp', '../img/5.webp',
//     '../img/6.webp', '../img/7.webp', '../img/8.webp',];

var src_Videos = ['../img/pastor.mp4'];

//Mostrar miniaturas por categorias
function mostrarMiniaturas() {
    var src_imagenes = [];
    for (i = 1; i < 50; i++) {
        src_imagenes[i] = `../img/${i}.webp`;
    }
    document.getElementById('img-miniaturas').innerHTML = '';
    document.getElementById('video-miniaturas').innerHTML = '';

    cat = document.getElementById('selectCat').value;
    if (cat == 'Imagenes') {
        src_imagenes.forEach(url => {
            $('#img-miniaturas').append(`
                <div class="img-miniatura col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                    <img src="${url}" width="100%" height="60%" alt="">
                </div>
                `);
        });
    } else if (cat == 'Videos') {
        src_Videos.forEach(url => {
            $('#video-miniaturas').append(`
                <div class="video-miniatura col-3 col-sm-2 col-md-2 col-lg-1 col-xl-1">
                    <video src="${url}" width="100%" height="100%"></video>
                </div>
                `);
        });
    }

}

// function subirArchivo() {
//     $('#subirArchivo').show();

// }

// Entradas
(function fechaActual() {
    var f = new Date();
    f.getTime()
    document.getElementById('date-post').innerHTML = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
})();

(function horaActual() {
    var f = new Date();
    f.getTime()
    document.getElementById('hour-post').innerHTML = (f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
})();

//Incluir el editor html en la pagina de nuevas paginas estaticas
(function incluirEditor() {

    try {
        CKEDITOR.replace('contentStaticPage');
    } catch (e) {

    }
})();

(function htmlEditor() {
    //incluir el editor de texto dentro del textarea con id igual a 'txtDescription'
    try {
        CKEDITOR.replace('contentPost');
    } catch (e) {

    }
})();

//Llenar categorias del formulario de creaccion de entradas
(() => {
    $.ajax({
        url: 'http://localhost:8888/catEntradas/',
        method: 'GET',
        // data: parametros,
        dataType: 'json',
        success: (res) => {
            for (let i = 0; i < res.length; i++) {
                $('#selectCatEntrada').append(
                    `<option value=${i + 1}>${res[i].categoria}</option>`
                );
            }
        },
        error: (error) => {
            console.error(error);
        }
    });
})()

//Agregar una nueva categoria de entradas
function guardarCategoria() {
    //validar si ya existe en la base de datos
    $.ajax({
        url: 'http://localhost:8888/catEntradas/',
        method: 'GET',
        dataType: 'json',
        success: (res) => {
            let cont = 0;
            for (let i = 0; i < res.length; i++) {
                if (res[i].categoria == $('#nombreCat').val())
                    cont++;
            }

            if ($('#nombreCat').val() == '') {
                document.getElementById('mensaje').innerHTML = '';
                $(".modal-body").append('Campo esta vacio');//Envío mensaje exitoso
                $("#mostrarMensaje").modal("show");//Mostrar mensaje de error
            } else if (cont == 0) {
                //Guardar en el servidor
                let cat = { categoria: $('#nombreCat').val() }
                console.log('Información a enviar: ' + cat);
                $.ajax({
                    url: 'http://localhost:8888/catEntradas/',
                    method: 'POST',
                    data: cat,
                    dataType: 'json',
                    success: (res) => {
                        anexarCategoriaTabla(cat);//agrego la fila a la tabla
                        document.getElementById('mensaje').innerHTML = '';
                        $(".modal-body").append('Categoria guardada exitosamente');//Envío mensaje exitoso
                        $("#mostrarMensaje").modal("show");//Mostrar mensaje de error
                        $('#nombreCat').val('');//

                    },
                    error: (error) => {
                        console.error(error);
                    }
                });
            } else {
                document.getElementById('mensaje').innerHTML = '';
                $(".modal-body").append('Categoria ya existe');//Envío mensaje exitoso
                $("#mostrarMensaje").modal("show");//Mostrar mensaje de error
            }
        },
        error: (error) => {
            console.error(error);
        }
    });
}

function keyPres() {
    $(document).keydown(function (tecla) {
        if (tecla.keyCode == 13 && $('#btn-actualizar').css('display') != 'none') {
            $('#btn-actualizar').focus();
        }
    });
}

function actualizarCatEntrada(id) {
    let cat = $('#nombreCat').val();
    let cont = 0;
    $.ajax({
        url: `http://localhost:8888/catEntradas/`,
        method: 'GET',
        dataType: 'json',
        success: (res) => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].categoria == cat) {
                    cont++;
                }
            }
            console.log(cont);
            if (cont <= 1) {
                $.ajax({
                    url: `http://localhost:8888/catEntradas/${id}`,
                    method: 'PUT',
                    data: cat,
                    dataType: 'json',
                    success: (res) => {
                        $('#guardar-categoria').show();                                     //Muestro el boton guardarcategoria
                        $('#btn-actualizar').hide();                                        //Oculto el boton actualizar categoria
                        let btnEditar = document.getElementById(id).children[1].children[0];//Obtenemos el boton editar
                        btnEditar.style.display = 'inline';                                 //Muestro el boton de editar
                        document.getElementById(id).children[0].innerHTML = $('#nombreCat').val(); //agrego el elemento modificado a la tabla
                        $('#nombreCat').val('');                                            //Limpio el input de nuevas categorias

                        //Mostrar un modal de confirmacion de modificacion de documento
                        document.getElementById('mensaje').innerHTML = '';
                        $(".modal-body").append('Categoria modificada exitosamente');//Envío mensaje exitoso
                        $("#mostrarMensaje").modal("show");//Mostrar mensaje de error
                    },
                    error: (error) => {
                        console.error(error);
                    }
                });
            } else {
                document.getElementById('mensaje').innerHTML = '';
                $(".modal-body").append('Categoria ya existe');//Envío mensaje exitoso
                $("#mostrarMensaje").modal("show");//Mostrar mensaje de error
            }
        }, error: (error) => {
            console.error(error);
        }
    });
}

function editarCatEntrada(id) {
    //validar si ya existe en la base de datos
    $.ajax({
        url: `http://localhost:8888/catEntradas/${id}`,
        method: 'GET',
        dataType: 'json',
        success: (res) => {
            $('#nombreCat').val(res.categoria);//
            $('#idCat').val(id);
            let btnEditar = document.getElementById(id).children[1].children[0];//Obtenemos el boton editar
            btnEditar.style.display = 'none';
            $('#btn-actualizar').show();
            $('#guardar-categoria').hide();
           // $('#nombreCat').focus();//
        },
        error: (error) => {
            console.error(error);
        }
    });
}

//Llena la tabla de categorias existentes
function llenarTablaCategorias() {
    document.getElementById('catExistentes').innerHTML = '';
    $.ajax({
        url: 'http://localhost:8888/catEntradas/',
        method: 'GET',
        dataType: 'json',
        success: (res) => {
            console.log(res);
            res.forEach(cat => {
                $('#catExistentes').append(`
                    <tr id="${cat._id}">
                        <td>${cat.categoria}</td>
                        <td>
                            <button id="btn-editar" type="button" onclick="editarCatEntrada('${cat._id}')" class="btn btn-info">Editar</button>
                            <button id="btn-eliminar" type="button" onclick="eliminarCatEntrada('${cat._id}')" class="btn btn-dark">Eliminar</button>
                        </td>
                    </tr>`
                );
            });
        },
        error: (error) => {
            console.error(error);
        }
    });
}

//Eliminar una categoria de la base de datos 
function eliminarCatEntrada(id) {
    $.ajax({
        url: `http://localhost:8888/catEntradas/${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: (res) => {
            (res.ok == 1)
            $(`#${id}`).remove();// esto elimina la columna de la tabla
        },
        error: (error) => {
            console.error(error);
        }
    });
}

//Agregar categoria a la table de categorias existentes
function anexarCategoriaTabla(cat) {
    $('#catExistentes').append(`
            <tr id="${cat._id}">
                <td>${cat.categoria}</td>
                <td>
                    <button id="btn-editar" type="button" onclick="editarCatEntrada('${cat._id}')" class="btn btn-info">Editar</button>
                    <button id="btn-eliminar type="button" onclick="eliminarCatEntrada('${cat._id}')" class="btn btn-dark">Eliminar</button>
            </tr>`
    );
}

//Pinta los campos si se dejan vacios para advertir al usuario
function colorear(elemento) {
    if (elemento.value == '') {
        $(elemento).removeClass('Ok');
        $(elemento).addClass('error');
    } else {
        $(elemento).removeClass('error');
        $(elemento).addClass('Ok');
    }

}

function iluminarCss() {
    var css = document.getElementById('css-personalizado').value;
    console.log(css);
    $('#css-personalizado').append(`
       <pre><code class="css">
            #personalizar-page{
                margin: 1rem;
                border: 1px solid #000;
                padding: 1.5rem;
            }
        </code></pre>`
    );
}

function validarCampos() {
    let usuario = {
        firstName: $('#firstname').val(),
        lastName: $('#lastname').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        username: $('#username').val(),
        rol: $('#roles').val()
    }

    campo.value != '' ? true : false
}

function validarCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo.value);
    return resultado;
}

//Funcion para registrar un nuevo usuario
function registrarUsuario() {

    //Guardar en el servidor
    let parametros = `firstName=${usuario.firstName}&lastName=${usuario.lastname}&email=${usuario.email}&password=${usuario.password}&username=${usuario.username}&rol=${usuario.rol}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url: 'http://localhost:8888/usuarios/',
        method: 'POST',
        data: parametros,
        dataType: 'json',
        success: (res) => {
            console.log(res);
            //if (res._id != undefined)
            //anexarFilaTabla(res);
        },
        error: (error) => {
            console.error(error);
        }
    });
}

//Funcion para mostrar roles al registrar clientes
(() => {
    $.ajax({
        url: 'http://localhost:8888/roles/',
        method: 'GET',
        // data: parametros,
        dataType: 'json',
        success: (res) => {
            for (let i = 0; i < res.length; i++) {
                $('#rolesUser').append(
                    `<option value=${i + 1}>${res[i].rol}</option>`
                );
            }
        },
        error: (error) => {
            console.error(error);
        }
    });
})()








