const { isAuth, isUserOrAdmin } = require('../../middlewares/Auth');
const {
  postStory,
  putStory,
  getStoriesByUser,
  deleteStory
} = require('../controllers/stories');

const storiesRouter = require('express').Router();

storiesRouter.post('/', [isAuth], postStory);
storiesRouter.put('/:id', [isAuth, isUserOrAdmin], putStory);
storiesRouter.delete('/:id', [isAuth, isUserOrAdmin], deleteStory);
storiesRouter.get('/usuarios/:user', getStoriesByUser);

module.exports = storiesRouter;
