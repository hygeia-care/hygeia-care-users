var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
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

/* POST user */
router.post('/', async function(req, res, next) {
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



module.exports = router;
