const { isAdmin, isAuth, isUserOrAdmin } = require('../../middlewares/Auth');
const {
  getSongs,
  getSongsByName,
  getSongsById,
  getSongsByArtist,
  postSong,
  putSong,
  deleteSong,
  getSongsNotVerified
} = require('../controllers/songs');

const songsRouter = require('express').Router();
songsRouter.get('/not-verified', [isAdmin], getSongsNotVerified);
songsRouter.get('/cancion/:name', getSongsByName);
songsRouter.get('/artista/:artist', getSongsByArtist);
songsRouter.get('/:id', getSongsById);
songsRouter.get('/', getSongs);
songsRouter.post('/', [isAuth], postSong);
songsRouter.put('/:id', [isAuth, isUserOrAdmin], putSong);
songsRouter.delete('/:id', [isAuth, isUserOrAdmin], deleteSong);

module.exports = songsRouter;
