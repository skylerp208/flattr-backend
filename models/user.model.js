const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    isAdmin: Boolean,
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

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
  return token;
};

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateUser;
