//Definimos una esrtuctura para guardar los datos en la tabla usuarios
var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    username:String,
    rol:String
});

module.exports = mongoose.model('usuarios',esquema);
