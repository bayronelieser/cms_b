
var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    titulo:String,
    descripcion:String,
    cssPer:String,
    javascriptPer:String,
    imagen:String
});

module.exports = mongoose.model('plantillas',esquema);