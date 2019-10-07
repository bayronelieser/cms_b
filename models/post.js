//Definimos una esrtuctura para guardar los datos en la tabla usuarios
var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    titulo:String,
    autor:String,
    fecha:String,
    hora:String,
    contenido:String,
    imagen:String,
    categoria:String,
    comentario:Boolean
});

module.exports = mongoose.model('entradas',esquema);
