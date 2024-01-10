const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Error JWT no válido' });
  }
};

module.exports = verifyToken;