const User = require('../models/users');
const bcrypt = require('bcrypt');
const { generateSign } = require('../../utils/jwt');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);

    const userDuplicated = await User.findOne({ email: req.body.email });

    if (userDuplicated) {
      return res.status(400).json('Este usuario ya existe');
    }

    newUser.rol = 'user';

    const user = await newUser.save();

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json('Error durante el registro de usuario');
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);

      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    return res.status(400).json('Error durante el login de usuario');
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json('users');
  } catch (error) {
    return res.status(400).json('error');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json({ mensaje: 'Usuario eliminado:', userDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const changeUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const userToUpdate = await User.findById(id);

    if (req.user.rol !== 'admin') {
      return res
        .status(400)
        .json('No tienes permiso para cambiar el rol de usuarios');
    }
    userToUpdate.rol = role;

    const updatedRole = await userToUpdate.save();

    return res.status(200).json(updatedRole);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error al cambiar el rol', error: error.message });
  }
};
module.exports = { register, login, getUsers, deleteUser, changeUserRole };
