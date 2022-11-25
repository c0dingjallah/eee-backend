const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// get all orders by user
const getOrders = async (req, res) => {
  //const user_id = req.user._id
  //const user_id = req.body.user._id
  const { id } = req.params
  console.log("id")
  console.log(id)

  try {

    const orders = await Order.find({user_id: id}).sort({createdAt: -1})
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

  
}

// get all orders
const getAllorders = async (req, res) => {

  try {

    const orders = await Order.find().sort({createdAt: -1})
    res.status(200).json(orders)
  } catch (error) {
    res.status(400).json({error: error.message})
  }

}


// create new order
const createOrder = async (req, res) => {
  const {username, itemname, image, price, date, time, contact, user_id} = req.body

  let emptyFields = []

  if(!username) {
    emptyFields.push('username')
  }
  if(!itemname) {
    emptyFields.push('itemname')
  }
 
  if(!image) {
    emptyFields.push('image')
  }

  if(!price) {
    emptyFields.push('price')
  }

  if(!date) {
    emptyFields.push('date')
  }

  if(!time) {
    emptyFields.push('time')
  }

  if(!contact) {
    emptyFields.push('contact')
  }
  
  if(!user_id) {
    emptyFields.push('user_id')
  }


  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    //const user_id = req.user._id
    //const user_id = req.user._id
    const order = await Order.create({username, itemname, image, price, date, time, contact, user_id})
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a order
const deleteOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such order'})
  }

  const order = await Order.findOneAndDelete({_id: id})

  if (!order) {
    return res.status(400).json({error: 'No such order'})
  }

  res.status(200).json(order)
}

// update a order
const updateOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such order'})
  }

  const order = await Order.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!order) {
    return res.status(400).json({error: 'No such order'})
  }

  res.status(200).json(order)
}


module.exports = {
  getOrders,
  getAllorders,
  createOrder,
  deleteOrder,
  updateOrder
}