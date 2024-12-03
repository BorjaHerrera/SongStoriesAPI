const { isAdmin, isAuth, isUserOrAdmin } = require('../../middlewares/Auth');
const {
  register,
  login,
  deleteUser,
  getUsers,
  changeUserRole
} = require('../controllers/users');

const userRouter = require('express').Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.put('/change-user/:id', [isAdmin], changeUserRole);
userRouter.delete('/:id', [isAuth, isUserOrAdmin], deleteUser);
userRouter.get('/', [isAdmin], getUsers);

module.exports = userRouter;
