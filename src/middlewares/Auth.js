const User = require('../api/models/users');
const { verifyJwt } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json('No estás autorizado. No hay token');
    }
    const parsedToken = token.replace('Bearer ', '');
    console.log(parsedToken);

    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json('No estás autorizado. Estás aquí');
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.rol === 'admin') {
    next();
  } else {
    return res.status(401).json('No tienes permisos de administrador');
  }
};

const isUserOrAdmin = (model) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await model.findById(id);

    if (resource.user === req.user._id || req.user._id === 'admin') {
      return next();
    } else {
      return res.status(401).json('No tienes permisos de administrador');
    }
  } catch (error) {
    return res.status(401).json('No tienes permisos de administrador');
  }
};

module.exports = { isAuth, isAdmin, isUserOrAdmin };
