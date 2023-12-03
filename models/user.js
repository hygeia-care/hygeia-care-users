var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },    
    password: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    compañiaSanitaria: {
        type: String,
        required: true
    },
    tarjetaSanitaria: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
  });
  
  userSchema.methods.cleanup = function() {
    return {
        _id: this._id,
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        apellidos: this.apellidos,
        compañiaSanitaria: this.compañiaSanitaria,
        tarjetaSanitaria: this.tarjetaSanitaria,
        rol: this.rol
    }
}

  
  // const User = mongoose.model('User', userSchema);
  //  const mongoose = require('mongoose'); 
    const dbuser = mongoose.createConnection('mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users');
    console.log("Connecting to database: %s", 'mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users');

  // Definición del modelo utilizando la conexión específica para apikeys
  const User = dbuser.model('User', userSchema);

  dbuser.on('error', console.error.bind(console, 'dbuser connection error'));
  
  module.exports = User;