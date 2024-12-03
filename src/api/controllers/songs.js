const Song = require('../models/songs');

const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find({ verified: true })
      .populate({
        path: 'stories',
        populate: {
          path: 'user',
          select: '-password -email'
        }
      })
      .populate({
        path: 'user',
        select: '-password -email'
      });
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Songs');
  }
};

const getSongsNotVerified = async (req, res, next) => {
  try {
    const songs = await Song.find({ verified: false });
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Songs');
  }
};

const getSongsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id)
      .populate({
        path: 'stories',
        populate: {
          path: 'user',
          select: '-password -email'
        }
      })
      .populate({
        path: 'user',
        select: '-password -email'
      });
    return res.status(200).json(song);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Song by Id');
  }
};

const getSongsByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const song = await Song.find({ name: name })
      .populate({
        path: 'stories',
        populate: {
          path: 'user',
          select: '-password -email'
        }
      })
      .populate({
        path: 'user',
        select: '-password -email'
      });
    return res.status(200).json(song);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Song by Name');
  }
};

const getSongsByArtist = async (req, res, next) => {
  try {
    const { artist } = req.params;

    const song = await Song.find({ artist: artist })
      .populate({
        path: 'stories',
        populate: {
          path: 'user',
          select: '-password -email'
        }
      })
      .populate({
        path: 'user',
        select: '-password -email'
      });
    return res.status(200).json(song);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Song by Artist');
  }
};

const postSong = async (req, res, next) => {
  try {
    const { name, artist } = req.body;

    const existingSong = await Song.findOne({ name, artist });
    if (existingSong) {
      return res.status(400).json({ message: 'Error: Esta canción ya existe' });
    }

    const newSong = new Song(req.body);

    if (req.user.rol === 'admin') {
      newSong.verified = true;
    } else {
      newSong.verified = false;
    }

    const songSaved = await newSong.save();

    return res.status(201).json(songSaved);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error en la solicitud Post Song');
  }
};

const putSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldSong = await Song.findById(id);
    const newSong = new Song(req.body);
    newSong._id = id;

    newSong.stories = [...oldSong.stories, ...newSong.stories];
    const updatedSong = await Song.findByIdAndUpdate(id, newSong, {
      new: true
    });
    return res.status(200).json(updatedSong);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Put Song');
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteBook = await Song.findByIdAndDelete(id);
    return res.status(200).json(deleteBook);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Delete Song');
  }
};

module.exports = {
  getSongs,
  getSongsNotVerified,
  getSongsById,
  getSongsByName,
  getSongsByArtist,
  postSong,
  putSong,
  deleteSong
};
