
var categorias_media = ['Imagenes', 'Videos', 'Archivos genéricos'];

(function llenarCategorias() {
    for (i = 0; i < categorias_media.length; i++) {
        $('#selectCat').append(`<option value="${categorias_media[i]}">${categorias_media[i]}</option>`);
    }
})();

var src_imagenes = ['../img/1.jpg', '../img/2.jpg', '../img/3.jpg', '../img/4.jpg', '../img/5.jpg',
    '../img/6.jpg', '../img/7.jpg', '../img/8.jpg',];

var src_Videos = ['../img/pastor.mp4'];

//Mostrar miniaturas por categorias
function mostrarMiniaturas() {
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

function subirArchivo() {
    $('#subirArchivo').show();

}

var cat_entradas = ['Noticias', 'Deportes', 'Farandula', 'Cine'];
//Mostrar en una tabla las categorias existentes
(function catEntradas() {
    cat_entradas.forEach(cat => {
        $('#catExistentes').append(`
            <tr>
                <td>${cat}</td>
                <td colspan="2"><a><i id="eliminar" class="far fa-trash-alt"></i></a><a><i id="editar" class="far fa-edit"></i></a></td>
            </tr>`
        );
    });
})();

// Entradas
(function fechaActual() {
    var f = new Date();
    f.getTime()
    document.getElementById('fecha').innerHTML = (f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear() + " " +
        f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds());
})();


(function incluirEditor() {
    //incluir el editor de texto dentro del textarea con id igual a 'txtDescription'
    try {
        CKEDITOR.replace('contenidoEntrada');
    } catch (e) {

    }
})();

//Llenar categorias del formulario de creaccion de entradas
(function llenarCatFrmEntradas() {
    cat_entradas.forEach(cat => {
        $('#selectCatEntrada').append(`
            <option value="${cat}">${cat}</option>`
        );
    });

})();

//Agregar una nueva categoria
function guardarCategoria() {
    let cat = $('#nombreCat').val();
    cat_entradas.push(cat);
    console.log(cat_entradas);
}


