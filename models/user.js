var mongoose = require("mongoose");
const dbusers = require("../dbuser");

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
    companiaSanitaria: {
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
        companiaSanitaria: this.companiaSanitaria,
        tarjetaSanitaria: this.tarjetaSanitaria,
        rol: this.rol
    }
}

  
  // const User = mongoose.model('User', userSchema);
  //  const mongoose = require('mongoose'); 
  /*
    const dbuser = mongoose.createConnection('mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users');
    console.log("user.js / Connecting to database: %s", 'mongodb+srv://users_SRV:QPeebigVw4YHOOnrZ3SG@cluster0.miuwv1w.mongodb.net/users');
    dbuser.on('error', console.error.bind(console, 'dbuser connection error'));
  */
  
    // Definición del modelo utilizando la conexión específica para apikeys
  
  
// Crea el modelo de la colección de usuarios utilizando la conexión de usuarios
const User = dbusers.model('User', userSchema);

module.exports = User;