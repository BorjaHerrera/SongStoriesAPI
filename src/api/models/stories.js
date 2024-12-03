const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    song: { type: mongoose.Types.ObjectId, required: true, ref: 'songs' }
  },
  {
    timestamps: true,
    collection: 'stories'
  }
);

const Story = mongoose.model('stories', storySchema, 'stories');

module.exports = Story;
