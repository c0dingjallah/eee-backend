const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  itemname: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true },{ collection : 'eeeorders' });

module.exports = mongoose.model('order', orderSchema, 'eeeorders')