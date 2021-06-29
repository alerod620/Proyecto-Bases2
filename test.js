const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
// Create a new schema that accepts a 'name' object.
// 'name' is a required field
const Usuario = new Schema({
        nombre:     { type: String },
        apellido:   { type: String },
        correo:     { type: String },
        password:   { type: String },
        telefono:   { type: Number },
        id_rol:     { type: Number },
        estado:     { type: Number}
});
//Create a new collection called 'Name'
const Name = mongoose.model('Name', Usuario);
describe('Database Tests', function() {

    //Antes de iniciar el test se realiza una conexión a la base de datos
    before(function (done) {

        mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/prueba?authSource=admin');
        mongoose.set('useNewUrlParser', true );
        mongoose.set('useUnifiedTopology', true );

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });


    describe('Test Database', function() {

        //Registra un usuario con correo 123@gmail.com
        it('Nuevo usario en la base de datos', function(done) {
            var user = new Name({
                nombre:     'Rey',
                apellido:   'Mendez',
                correo:     '123@gmail.com',
                password:   '123',
                telefono:   123,
                id_rol:     1,
                estado:     1
            });
        
            user.save(done);
        });

        /*
        it('No guardar informacion con formato incorrecto', function(done) {
            //Intenta guardar información erronea
            var user = new Name({
                nombre:     'Rey',
                apellido:   'Mendez',
                correo:     '123@gmail.com',
                password:   '123',
                telefono:   123,
                id_rol:     '1',
                estado:     1
            });

            user.save(err => {
                if(err) { return done(); }
                throw new Error('Debe generar error');
            });
        });
        */

        it('Debe retornar los datos de la base de datos', function(done) {
            //Busca el usuario con correo 123@gmail.com
            Name.find({correo: '123@gmail.com'}, (err, name) => {
                if(err) {throw err;}
                if(name.length === 0) {throw new Error('No data!');}
                done();
            });
        });

    });

    //Termina la conexion y elimina la base de datos
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

});
