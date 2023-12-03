var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    console.log("hola");
    const result = await User.find();
    res.send(result.map((c) => c.cleanup()));
  } catch(e) {
    // debug("DB problem", e);
    console.error(e);
    res.sendStatus(500);
  }
});

/* GET user/id */
/*
router.get('/:email', async function(req, res, next) {
  var email = req.params.email;
  var result = User.find(c => {
    return c.email === email;
  });
    if (result) {
    res.send({
      ...result
    });
  } else {
    res.sendStatus(404);
  }
})
*/

/*
router.get('/:email', async function(req, res, next) {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});
*/

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
  
    if (!id) {
      // Se debe proporcionar un ID. Código de estado: 400 Bad Request /
      res.sendStatus(400);
      return;
    }

    if (!id.match(/^[0-9a-f]{24}$/)) {
      // El ID no tiene el formato correcto. Código de estado: 400 Bad Request
      res.sendStatus(400);
      return;
    }

    // Validación del token JWT
    /*
    const token = req.headers['x-auth-token'];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    if (!token || !decodedToken || userId === null) {
      // Código de estado: 401 Unauthorized
      res.sendStatus(401);
      res.send({
        error: 'El usuario no está autorizado.',
      });
      return;
    }
    */

    const user = await User.findOne({ _id: id });

    if (!user) {
      // El usuario no existe.Código de estado: 404 Not Found
      res.sendStatus(404);
      return;
    }

    // Validación de los permisos
    /*
    const currentUser = req.user;

    if (!currentUser || !currentUser.hasRole('Administrador')) {
      // El usuari no tiene los permisos necesarios para realizar la operación. Código de estado: 403 Forbidden
      res.sendStatus(403);
      return;
    }
    */

    res.send(user);
  } catch (err) {
    next(err);
  }
});



/* POST user */
// curl -v -H "Authorization: Bearer 0000" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:3000/?access_token=0000

router.post('/', 
  passport.authenticate('bearer', {session:false}),
  async function(req, res, next) {
  const {nombre, email, password, apellidos, compañiaSanitaria, tarjetaSanitaria, rol} = req.body;

  const user = new User({
    nombre,
    email,
    password,
    apellidos,
    compañiaSanitaria,
    tarjetaSanitaria,
    rol
  });


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
  // Validación de los permisos
  /*
  const currentUser = req.user;

  if (!currentUser || !currentUser.hasRole('Administrador')) {
    // Código de estado: 403 Forbidden
    res.sendStatus(403);
    return;
  }
  */

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
    if (e.errors) {
      // debug("Validation problem when saving");
      console.error(e);
      res.status(400).send({error: e.message});
    } else {
      // debug("DB problem", e);
      console.error(e);
      res.sendStatus(500);
    }
  }
});

router.put('/:id', 
  passport.authenticate('bearer', {session:false}),
  async function(req, res) {
  // Obtención del ID del usuario
  const id = req.params.id;

  // Validación del ID
  if (!id || !id.match(/^[0-9a-f]{24}$/)) {
    // Código de estado: 400 Bad Request
    res.sendStatus(400);
    return;
  }

  // Obtención de los datos del usuario
  const user = await User.findById(id);

  if (!user) {
    // Código de estado: 404 Not Found
    res.sendStatus(404);
    return;
  }

  // Validación de los datos del usuario
  const { nombre, email, password, apellidos, compañiaSanitaria, tarjetaSanitaria, rol } = req.body;

  if (!nombre || !email || !password || !apellidos || !compañiaSanitaria || !tarjetaSanitaria || !rol) {
    // Código de estado: 400 Bad Request
    res.sendStatus(400);
    return;
  }

  // Actualización de los datos del usuario
  user.nombre = nombre;
  user.email = email;
  user.password = password;
  user.apellidos = apellidos;
  user.compañiaSanitaria = compañiaSanitaria;
  user.tarjetaSanitaria = tarjetaSanitaria;
  user.rol = rol;

  try {
    await user.save();
    // Código de estado: 200 OK
    res.sendStatus(200);
  } catch(e) {
    // Código de estado: 500 Internal Server Error
    res.sendStatus(500);
  }
});

router.delete('/:id', async function(req, res) {
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

module.exports = router;
