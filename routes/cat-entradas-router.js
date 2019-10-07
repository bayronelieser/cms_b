var express = require('express');
var catEntrada = require('../models/categoria-entrada');
var router = express.Router();

//Renderizar el formulario de nuevas categorias de entradas
router.get('/new-category',(req , res)=>{
    res.render('new-category');
});

//Almacenar una categoria de entrada
router.post('/', function (req, res) {
    let cat = new catEntrada({
        categoria:req.body.categoria
    });

    //Promesa
    cat.save()
        .then(function (obj) {
            res.send(obj);
            res.end();
            
        })
        .catch(function (error) {
            res.send(error);
            res.end();
        });
});

//Eliminar una categoria
router.delete('/:id', function (req, res) {
    catEntrada.remove({ _id: req.params.id })
        .then((result) => {
            res.send(result);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener una categoria
router.get('/:id', function (req, res) {
    catEntrada.find({ _id: req.params.id })
        .then((data) => {
            res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener todas las categorias
router.get('/', function (req, res) {
    catEntrada.find()
        .then((data) => {
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
    catEntrada.update(
        { _id: req.params.id },
        {
            categoria: req.body.categoria
           
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