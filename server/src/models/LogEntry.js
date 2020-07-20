const mongoose = require('mongoose');

const { Schema } = mongoose;

const logEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  }, // String is shorthand for {type: String}
  description: {
    type: String,
  },
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});
