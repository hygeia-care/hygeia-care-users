var mongoose = require("mongoose");
const dbusers = require("../dbuser");

const userSchema = new mongoose.Schema({
   
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio'],
        trim: true, // Elimina espacios en blanco al principio y al final
    },
    email: {
        type: String,
        required: [true, 'El campo email es obligatorio'],
        unique: true, // Asegura que el email sea único en la colección
        trim: true,
        lowercase: true, // Convierte el email a minúsculas
        match: [/\S+@\S+\.\S+/, 'El formato del email no es válido'], // Valida el formato del email   
    },    
    password: {
        type: String,
        required: [true, 'El campo password es obligatorio'],
        validate: {
          validator: function (value) {
            // La contraseña debe contener al menos una letra y al menos un número
            return /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value);
          },
          message: 'La contraseña debe contener al menos una letra y al menos un número',
        },
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],    
    },
    apellidos: {
        type: String,
        required: [true, 'El campo apellidos es obligatorio'],
        trim: true, // Elimina espacios en blanco al principio y al final
    },
    companiaSanitaria: {
        type: String,
    },
    tarjetaSanitaria: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El campo rol es obligatorio'],
        enum: ['Admin', 'Usuario'],
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