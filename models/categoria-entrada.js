//Definimos una esrtuctura para guardar los datos en la tabla categorias
var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    categoria:String
});

module.exports = mongoose.model('CatEntradas',esquema);