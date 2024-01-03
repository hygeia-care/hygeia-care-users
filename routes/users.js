var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bills = require('../services/bills');
var passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyJWTToken'); 

require('dotenv').config();



/* GET users listing. */
//router.get('/', passport.authenticate('bearer', {session:false}), async function(req, res, next) {
router.get('/', [passport.authenticate('bearer', { session: false }), verifyToken], async function(req, res, next) {

  try {
    try{
      // Validación del token JWT
      const token = req.headers['x-auth-token'];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch{
        // Código de estado: 401 Unauthorized
        return res.status(401).json({ error: 'Error JWT no valido' });
    }
    const result = await User.find();
    res.send(result.map((c) => c.cleanup()));
  } catch(e) {
    // debug("DB problem", e);
    console.error(e);
    res.sendStatus(500);
  }
});

//router.get('/:id', passport.authenticate('bearer', {session:false}), async function(req, res, next) {
router.get('/:id', [passport.authenticate('bearer', { session: false }), verifyToken], async function(req, res, next) {

  try {
      try{
        // Validación del token JWT
        const token = req.headers['x-auth-token'];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch{
          // Código de estado: 401 Unauthorized
          return res.status(401).json({ error: 'Error JWT no valido' });
      }
    const id = req.params.id;
    if (!id.match(/^[0-9a-f]{24}$/)) {
      // El ID no tiene el formato correcto. Código de estado: 400 Bad Request
      res.sendStatus(400);
      return;
    }

    const user = await User.findOne({ _id: id });

    if (!user) {
      // El usuario no existe.Código de estado: 404 Not Found
      res.sendStatus(404);
      return;
    }

    var billsData = await bills.getBills(); 
    console.log('billsData:', billsData);
    user.bills = billsData;
    console.log('user:', user);
    //res.send(user);
    // Envía la respuesta con los datos del usuario y las facturas
    res.send({
      ...user.toObject(),  // Convertimos el objeto mongoose a un objeto simple
      "bills": billsData
    });


  } catch (err) {
    next(err);
  }
});



/* POST user */
// curl -v -H "Authorization: Bearer 0000" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:3000/?access_token=0000

//router.post('/', passport.authenticate('bearer', {session:false}),async function(req, res, next) {
router.post('/', [passport.authenticate('bearer', { session: false }), verifyToken], async function(req, res, next) {

  const {nombre, email, password, apellidos, companiaSanitaria, tarjetaSanitaria, rol} = req.body;

  const user = new User({
    nombre,
    email,
    password,
    apellidos,
    companiaSanitaria,
    tarjetaSanitaria,
    rol
  });

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }
  
  // Validación del token JWT
/*
  const token = req.headers['x-auth-token'];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

  if (!token || !decodedToken || userId === null) {
    // Código de estado: 401 Unauthorized
    res.sendStatus(401);
    return;
  }
*/
  // Validación de los permisos no es necesario. Todos los roles pueden ejecutar esta acción.

  // Validación del correo electrónico
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Código de estado: 409 Conflict
    res.sendStatus(409);
    return;
  }

  try {
    await user.save();
    return res.sendStatus(201);
  } catch(e) {
    if (e.name === 'ValidationError') {
      // Validación de Mongoose
      const validationErrors = Object.values(e.errors).map(error => error.message);
      return res.status(400).json({ error: 'Error de validación', validationErrors });
    } else {
      // Otros errores
      console.error(e);
      // Código de estado: 500 Internal Server Error
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

//router.put('/:id', passport.authenticate('bearer', {session:false}), async function(req, res) {
router.put('/:id', [passport.authenticate('bearer', { session: false }), verifyToken], async function(req, res, next) {

  try {
    // Obtención del ID del usuario
    const id = req.params.id;

    // Validación del ID
    if (!id || !id.match(/^[0-9a-f]{24}$/)) {
      // Código de estado: 400 Bad Request
      console.log("ID no válido");
      return res.sendStatus(400);
    }
  
    // Obtención de los datos del usuario
    const user = await User.findById(id);
    if (!user) {
      console.log("Usuario no existe");
      return res.sendStatus(404);
    }
    // Validación de los datos del usuario
    const { nombre, email, password, apellidos, companiaSanitaria, tarjetaSanitaria, rol } = req.body;
    if (!nombre || !email || !password || !apellidos || !companiaSanitaria || !tarjetaSanitaria || !rol) {
      console.log("Faltan datos obligatorios");
      return res.sendStatus(400);
    } 
    
    // Actualización de los datos del usuario
        user.nombre = nombre;
        user.email = email;
        user.password = password;
        user.apellidos = apellidos;
        user.companiaSanitaria = companiaSanitaria;
        user.tarjetaSanitaria = tarjetaSanitaria;
        user.rol = rol;
      
          // Si hay una nueva contraseña, encriptarla y actualizar
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    //await user.save();
    //return res.sendStatus(200);
        // Guardar los cambios y manejar las validaciones de Mongoose
    try {
      await user.save();
      return res.sendStatus(200);
    } catch (mongooseError) {
      if (mongooseError.name === 'ValidationError') {
        // Capturar errores de validación de Mongoose
        const validationErrors = Object.values(mongooseError.errors).map(error => error.message);
        return res.status(400).json({ error: 'Error de validación', validationErrors });
      }
      throw mongooseError; // Reenviar errores no relacionados con la validación
    }
    
  } catch(e) {
    // Código de estado: 500 Internal Server Error
    return res.sendStatus(500);
  }
});

//router.delete('/:id', passport.authenticate('bearer', {session:false}), async function(req, res) {
router.delete('/:id', [passport.authenticate('bearer', { session: false }), verifyToken], async function(req, res, next) {
  // Obtención del ID del usuario
  const id = req.params.id;

  // Validación del ID
  if (!id || !id.match(/^[0-9a-f]{24}$/)) {
    // Código de estado: 400 Bad Request
    res.sendStatus(400);
    return;
  }

  // Eliminación del usuario
  try {
    await User.deleteOne({ _id: id });
    // Código de estado: 200 OK
    res.sendStatus(200);
  } catch(e) {
    // Código de estado: 500 Internal Server Error
    res.sendStatus(500);
  }
});

router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  try {
 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    
    // Obtener el rol del usuario desde la base de datos
    const userWithRol = await User.findOne({ email }).select('rol');

        // Generar un token JWT con el ID y el rol del usuario

    //const token = jwt.sign({ id: user._id, rol: userWithRol.rol }, process.env.JWT_SECRET, {expiresIn: '30s',});
    const token = jwt.sign({ id: user._id, rol: userWithRol.rol }, process.env.JWT_SECRET);

    // Devolver el token en la respuesta
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
});

//router.post('/check', async function (req, res, next) {
router.post('/check', [passport.authenticate('bearer', { session: false }), verifyToken], async function(req, res, next) {

  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //const userId = decoded.id;
    //const userRol = decoded.rol;

    //return res.json({ message: 'Token válido', userId , userRol});

    return res.status(200).json({ message: 'Token válido'});

  } catch (error) {
    // Si el token no es válido, el bloque catch se ejecutará
    return res.status(401).json({ message: 'Token no válido' });
  }
});


module.exports = router;
