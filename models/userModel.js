const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  lemailornum: {
    type: String,
    required: true,
    unique: true
  },
  lpassword: {
    type: String,
    required: true
  }
},{ collection : 'eeeusers' });


// static signup method
userSchema.statics.signup = async function(name, emailornum, password) {

  // validation
  if (!name || !emailornum || !password) {
    throw Error('All fields must be filled')
  }
  // if (!validator.isEmail(email)) {
  //   throw Error('Email not valid')
  // }
//   if (!validator.isStrongPassword(password)) {
//     throw Error('Password not strong enough')
//   }

  const exists = await this.findOne({ emailornum })

  if (exists) {
    throw Error('Email or phone number already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, emailornum, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(lemailornum, lpassword) {

  if (!lemailornum || !lpassword) {
    throw Error('All fields must be filled')
  }
  const emailornum = lemailornum;
  const password = lpassword;
  const user = await this.findOne({ emailornum })
  if (!user) {
    throw Error('Incorrect email or phone number')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
