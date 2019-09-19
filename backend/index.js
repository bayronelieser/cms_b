var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//var usuariosRouter = require('./routers/usuarios-router');
//var empresasRouter = require('./routers/empresas-router');
var database = require('./modules/database');
var app = express();

//Configuraciones del servidor
app.set('port',process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'www/admin/pages'));
app.set('view engine','ejs');

//Rutas
app.get('/newtheme',(req , res)=>{
    res.render('newtheme');
});

app.get('/page-principal-edit',(req , res)=>{
    res.render('page-principal-edit');
});

//Middlewares
app.use(express.static("www"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use('/usuarios',usuariosRouter);
//app.use('/empresas',empresasRouter);

app.listen(8888, ()=>{
    console.log('Servidor levantado en:', app.get('port'));
});