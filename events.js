const express = require("express");
const router = express.Router();

var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');

//Login
router.post("/Login", (req, res, next) =>{

})

//Registro
router.post("/Registro", (req, res, next) =>{
    exports.registrarUsuario = function(req, res){
        console.log(req.body);
    }
})