var express = require('express');
var usuario = require('../models/usuario');
var router = express.Router();

//Renderizar el formulario de registrar usuario
router.get('/new-user',function (req , res){
    res.render('newuser');
    res.end();
});

//Almacenar un usuario
router.post('/nuevoUsuario', function (req, res) {
    let u = new usuario({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        username:req.body.username,
        rol:req.body.rol
    });

    //Promesa
    u.save()
        .then(function (res) {
            res.send(res);
            res.end();
        })
        .catch(function (error) {
            res.send(error);
            res.end();
        });
});

//Eliminar un usuario
router.delete('/:id', function (req, res) {
    usuario.remove({ _id: req.params.id })
        .then((result) => {
            res.send(result);
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener un usuario
router.get('/:id', function (req, res) {
    usuario.find({ _id: req.params.id })
        .then((data) => {
        
            res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
            res.end();
        })
        .catch((error) => {
            res.send(error);
            res.end();
        });
});

//Obtener todos los usuarios
router.get('/', function (req, res) {
    usuario.find()
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
    usuario.update(
        { _id: req.params.id },
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            rol: req.body.rol
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