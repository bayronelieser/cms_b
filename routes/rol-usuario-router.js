var express = require('express');
var rol = require('../models/rolUsuario');
var router = express.Router();

//Renderizar el formulario para un nuevo rol
router.get('/new-rol', function (req, res) {
    res.render('rol');
    res.end();
 });
 
 //Almacenar un nuevo rol
 router.post('/', function (req, res) {
     let r = new rol({
         rol: req.body.rol
     });
 
     //Promesa
     r.save()
         .then(function (res) {
             res.send(res);
             res.end();
         })
         .catch(function (error) {
             res.send(error);
             res.end();
         });
 });
 
 //Eliminar un rol de usuario
 router.delete('/:id', function (req, res) {
     rol.remove({ _id: req.params.id })
         .then((res) => {
             res.send(res);
             res.end();
         })
         .catch((error) => {
             res.send(error);
             res.end();
         });
 });
 
 //Obtener un rol
 router.get('/:id', function (req, res) {
     rol.find({ _id: req.params.id })
         .then((data) => {
 
             res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
             res.end();
         })
         .catch((error) => {
             res.send(error);
             res.end();
         });
 });
 
 //Obtener todos los roles
 router.get('/', function (req, res) {
     rol.find()
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
     rol.update(
         { _id: req.params.id },
         {
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