var express = require('express');
var plantilla = require('../models/plantilla');
var router = express.Router();

//Renderizar el formulario para guardar nueva plantilla
router.get('/newTheme', function (req, res) {
    res.render('newTheme');
    res.end();
});

//Almacenar un tema nuevo
router.post('/', function (req, res) {
    let p = new plantilla({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        cssPer: req.body.cssPer,
        javascriptPer: req.body.javascriptPer,
        imagen: req.body.imagen
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

//Eliminar un tema
router.delete('/:id', function (req, res) {
    plantilla.remove({ _id: req.params.id })
        .then((result) => {
            res.send(result);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener un tema
router.get('/:id', function (req, res) {
    plantilla.find({ _id: req.params.id })
        .then((data) => {
            res.send(data[0]);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener todos los temas
router.get('/', function (req, res) {
    plantilla.find()
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
    plantilla.update(
        { _id: req.params.id },
        {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            cssPer: req.body.cssPer,
            javascriptPer: req.body.javascriptPer,
            imagen: req.body.imagen
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