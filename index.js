var express = require("express");
var app = express();

app.use(express.static("www"));
app.set('views', './views');
app.set('view engine', 'pug');

app.listen(8888, function(){
    console.log("Servidor levantado el el puerto 8888");
});