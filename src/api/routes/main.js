const songsRouter = require('./songs');
const storiesRouter = require('./stories');
const userRouter = require('./users');

const mainRouter = require('express').Router();

mainRouter.use('/users', userRouter);
mainRouter.use('/songs', songsRouter);
mainRouter.use('/stories', storiesRouter);

module.exports = mainRouter;
