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

  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;