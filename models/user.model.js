const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  bio: {
    type: String,
    required: false,
    unique: false,
    trim: false,
    minlength: 30,
  },
  additional: {
    type: String,
    required: false,
    unique: false,
    trim: false,
    minlength: 30,
  },
  preferences: {
    type: String,
    required: false,
    unique: false,
    trim: false,
    minlength: 30,
  },
  likeIds: {
    type: Array,
  },
  matchIds: {
    type: Array,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
