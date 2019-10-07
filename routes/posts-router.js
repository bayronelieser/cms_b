var express = require('express');
var post = require('../models/post');
var router = express.Router();

//Renderizar el formulario de nuevas entradas
router.get('/new-post',(req , res)=>{
    res.render('new-post');
});

//Almacenar una entrada
router.post('/', function (req, res) {
    //console.log("Enviando desde router.post", req.body);
    let p = new post({
        titulo: req.body.titulo,
        autor: req.body.autor,
        fecha: req.body.fecha,
        hora: req.body.hora,
        contenido: req.body.contenido,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        comentario: req.body.comentario
    });

    //Promesa
    p.save()
        .then(function (res) {
            res.send(res);
            res.end();
        })
        .catch(function (error) {
            res.send(error);
            res.end();
        });
});

//Eliminar una entrada
router.delete('/:id', function (req, res) {
    post.remove({ _id: req.params.id })
        .then((result) => {
            res.send(result);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener una entrada
router.get('/:id', function (req, res) {
    post.find({ _id: req.params.id })
        .then((data) => {

            res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener todas las entradas
router.get('/', function (req, res) {
    post.find()
        .then((data) => {
            console.log(data);
            res.send(data);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
            console.log('error');
        });
});

router.put('/:id', function (req, res) {
    post.update(
        { _id: req.params.id },
        {
            titulo: req.body.titulo,
            autor: req.body.autor,
            fecha: req.body.fecha,
            hora: req.body.hora,
            contenido: req.body.contenido,
            imagen: req.body.imagen,
            categoria: req.body.categoria,
            comentario: req.body.comentario
        }
    )
        .then((result) => {
            res.send(result);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

module.exports = router;