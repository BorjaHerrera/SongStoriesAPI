require('dotenv').config();

const mongoose = require('mongoose');
const Song = require('../api/models/songs');
const songsData = require('./songsData');

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(async () => {
    const song = await Song.find();

    if (song.length) {
      Song.collection.drop();
      console.log('Se ha eliminado la coleccción Song');
    }
    await Song.insertMany(songsData);
    console.log('Se ha incluido la coleccción Song del array');
  })
  .finally(() => {
    mongoose.disconnect();
    console.log('Desconectado');
  });
