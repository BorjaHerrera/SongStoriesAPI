const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    rol: { type: String, required: true, enum: ['admin', 'user'] }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;
