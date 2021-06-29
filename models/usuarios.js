var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

exports = module.exports = function(app, mongoose){
    
    var Peliculas = new Schema({
        Titulo:         { type: String },
        Actores:        { type: String },
        Directores:     { type: String },
        Genero:         { type: String },
        Rating:         { type: String }
      });
      
      module.exports = mongoose.model('Peliculas', Peliculas);
    
};
