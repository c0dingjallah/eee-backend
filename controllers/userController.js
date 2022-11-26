const User = require('../models/userModel')
const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {emailornum, password} = req.body

  try {
    const user = await User.login(emailornum, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {name, emailornum, password} = req.body

  try {
    const user = await User.signup(name, emailornum, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login admin user
const loginAdmin = async (req, res) => {
  const {emailornum, password} = req.body

  try {
    const admin = await Admin.login(emailornum, password)

    // create a token
    const token = createToken(admin._id)

    res.status(200).json({admin, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


const signupAdmin = async (req, res) => {
  const {name, emailornum, password} = req.body

  try {
    const admin = await Admin.signup(name, emailornum, password)

    // create a token
    const token = createToken(admin._id)

    res.status(200).json({admin, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, loginAdmin, signupAdmin }