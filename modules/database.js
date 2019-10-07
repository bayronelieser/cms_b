var mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'cms_faper';

class Database{
    constructor(){
        //Promesas
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(()=>{
            console.log('Se conecto a mongodb');
        }).catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();