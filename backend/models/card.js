const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, 'Link required'],
    validate: {
      validator(v) {
        const regex = /https?:\/\/(www\.)?([/a-zA-Z\d\-._~:?#[\]@!$&'()*+,;=]+\.)+(\/#)?/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
