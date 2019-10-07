var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    rol:String
});

module.exports = mongoose.model('rolesUsuario',esquema);