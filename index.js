var express = require("express");
        var app = express();
        var port = 3333;

        //Exponer una carpeta como publica para archivos estaticos
        app.use(express.static("www"));

        app.listen(port, function(){
            console.log("Servidor levantado en el puerto:", port);
        });