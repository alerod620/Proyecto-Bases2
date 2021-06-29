var mongoose = require('mongoose');
var Usuario  = mongoose.model('Usuario');

//Buscar usuario y contraseña
exports.findUsuario = function(req, res) {
	Usuario.find({correo: req.body.user, password: req.body.password}, function(err, u) {
        if(err) return res.send(false);

        console.log('GET /Login/ ' + req.body.user + ' ' + req.body.password);
		if(u.length === 0 ) res.send(false)
		res.status(200).json(u[0]);
	});
};


//Insertar un nuevo usuario
exports.registrarUsuario = function(req, res) {

	Usuario.find({correo: req.body.correo}, function(err, u){
		if(err) return res.send(500, err.message)
		else{
			if(u.length == 0){
				var user = new Usuario({
					nombre:     req.body.nombre,
					apellido:   req.body.apellido,
					correo:     req.body.correo,
					password:   req.body.password,
					editorial:  req.body.editorial,
					telefono:   req.body.telefono,
					id_rol:     req.body.id_rol,
					estado:     req.body.estado
				});
			
				user.save(function(err, user) {
					if(err) return res.status(500).send( err.message);
				res.status(200).json(user);
				});
			}
			else{
				return res.status(500).json('El usuario ya existe');
			}
		}
	});
};


//Elimina un usuario
exports.eliminarUsuario = function(req, res) {
	Usuario.find({correo: req.body.correo}, function(err, u){
		if(err) return res.send(500, err.message)
		else{
			if(u.length == 0){
				return res.status(500).json('El usuario no existe');
			}
			else{
				Usuario.findOneAndDelete({correo: req.body.correo}, function(erro) {
					if(erro) return res.send(500, erro.message);
					else{
						res.status(200).json("Usuario eliminado con exito");
					}
				})
			}
		}
	});
}

//Actualiza un usuario
exports.updateUsuario = function(req, res) {
	Usuario.findOne({correo: req.body.correo}, function(err, user) {

		user.nombre 	= 	req.body.nombre,
		user.apellido	=   req.body.apellido,
		user.correo		= 	req.body.correo,
		user.password	=   req.body.password,
		user.telefono	=  	req.body.telefono,
		user.id_rol		=  	req.body.id_rol,
		user.estado		=  	req.body.estado

		user.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).json(user);
		});
	});
};


//Devuelve todos los usuarios
exports.findAllUsuarios = function(req, res) {
	Usuario.find(function(err, user) {
    if(err) res.send(500, err.message);

		res.status(200).json(user);
	});
};
