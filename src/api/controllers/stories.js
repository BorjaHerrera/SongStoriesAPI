const Song = require('../models/songs');
const Story = require('../models/stories');

const getStoriesByUser = async (req, res, next) => {
  try {
    const { user } = req.params;
    const stories = await Story.find({ user: user }).populate('song');
    return res.status(200).json(stories);
  } catch (error) {
    return res.status(400).json('Error en la solicitud Get Stories by User');
  }
};

const postStory = async (req, res, next) => {
  try {
    const { text, user, song } = req.body;

    const newStory = new Story({ song, text, user });
    const story = await newStory.save();

    const uploadedStory = await Song.findByIdAndUpdate(song, {
      $push: { stories: story._id }
    });
    return res.status(201).json({
      story: story,
      songUpdate: uploadedStory
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json('Error en la solicitud postStory');
  }
};

const putStory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newStory = new Story(req.body);
    newStory._id = id;

    const updatedStory = await Story.findByIdAndUpdate(id, newStory, {
      new: true
    });
    return res.status(201).json(updatedStory);
  } catch (error) {
    return res.status(400).json('Error en la solicitud putStory');
  }
};

const deleteStory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteStory = await Story.findByIdAndDelete(id);

    const deletedStoryFromSong = await Song.updateOne(
      { stories: id },
      { $pull: { stories: id } }
    );
    return res.status(200).json({
      story: deleteStory,
      songUpdate: deletedStoryFromSong
    });
  } catch (error) {
    return res.status(400).json('Error en la solicitud deleteStory');
  }
};

module.exports = { getStoriesByUser, postStory, putStory, deleteStory };
