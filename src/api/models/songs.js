const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    stories: [
      { type: mongoose.Types.ObjectId, require: false, ref: 'stories' }
    ],
    user: { type: mongoose.Types.ObjectId, require: true, ref: 'users' },
    verified: { type: Boolean, requiered: true, default: false }
  },
  {
    timestamps: true,
    collection: 'songs'
  }
);

const Song = mongoose.model('songs', songSchema, 'songs');

module.exports = Song;
