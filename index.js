var express  = require("express"),
    app      = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
var cors = require('cors')
 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

const { poolPromise } = require('./connection/sql_db')  

var router = express.Router();

var models = require('./models/usuarios')(app, mongoose);
var Peliculas = require('./controllers/usuarios');

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

/*Variables de Sequelize
const Sequelize = require('sequelize')

const sequelize = new Sequelize('Bases2', 'root', 'secret', {
  host: '18.191.252.142', port: '3306',
  dialect: 'mysql'});
*/

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
var Pelicula  = mongoose.model('Peliculas');

const recursive = function () {
  
  mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/Bases2?authSource=admin', function(err, res) {
    if(err) {
      console.log('ERROR: connecting to Database. ' + err);
    }
    {
      var res;
      try {  
        const pool = await poolPromise  
        const result = await pool.request()  
        .query('select * from title',function(err, profileset){  
          if (err)  
          {  
            console.log(err)  
          }  
          else {  
            var send_data = profileset.recordset;  
            res.json(send_data);  
          }  
        })  
      } catch (err) {  
        res.status(500)  
        res.send(err.message)  
      } 

      console.log("Valor de res", res);
      /*
      Pelicula.find({Titulo: req.body.Titulo}, function(err, u){
        if(err) console.log("Error");
        else{
          if(u.length == 0){
            var pelicula = new Pelicula({
              Titulo:     req.body.nombre,
              Actores:   req.body.apellido,
              Directores:     req.body.correo,
              Genero:   req.body.password,
              Rating:  req.body.editorial
            });
          
            user.save(function(err, pelicula) {
              if(err) console.log(err);
            console.log(user);
            });
          }
          else{
            console.log('La película ya existe');
          }
        }
      });
      */
    }
    
  });
  setTimeout(recursive,10000);
}
recursive();

/*
mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/Bases2?authSource=admin', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
*/


//API 
/*
app.route('/Registro')
  .post(Usuarios.registrarUsuario);

app.route('/Login')
  .post(Usuarios.findUsuario);

app.route('/Eliminar_Usuario')
  .post(Usuarios.eliminarUsuario);

app.route('/Usuarios')
  .get(Usuarios.findAllUsuarios);

app.route('/Actualizar_Usuario')
  .put(Usuarios.updateUsuario);
  */