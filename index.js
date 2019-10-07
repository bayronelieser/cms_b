var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var usersRouter = require('./routes/usuarios-router');
var rolesUserRouter = require('./routes/rol-usuario-router');
var entradasRouter = require('./routes/posts-router');
var catEntradasRouter = require('./routes/cat-entradas-router');
var plantillasRouter = require('./routes/plantillas-router');

var database = require('./modules/database');
var app = express();

//Configuraciones del servidor
app.set('port',process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'www/admin/pages'));
app.set('view engine','ejs');

//Middlewares
app.use(express.static("www"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/admin/usuarios',usersRouter);
app.use('/admin/roles',rolesUserRouter);
app.use('/admin/entradas',entradasRouter);
app.use('/admin/catEntradas',catEntradasRouter);
app.use('/admin/plantillas', plantillasRouter);

//Rutas para renderizar los archivos estaticos del frontend
app.get('/admin/pages/page-principal',(req , res)=>{
    res.render('index');
});

app.get('/admin/pages/page-principal-edit',(req , res)=>{
    res.render('page-principal-edit');
});
app.get('/admin/pages/new-post-page',(req , res)=>{
    res.render('new-post-page');
});
app.get('/admin/pages/static-pages',(req , res)=>{
    res.render('static-pages');
});
app.get('/admin/pages/new-static-page',(req , res)=>{
    res.render('new-static-page');
});
app.get('/admin/res/media',(req , res)=>{
    res.render('media');
});
app.listen(8888, ()=>{
    console.log('Servidor levantado en:', app.get('port'));
});