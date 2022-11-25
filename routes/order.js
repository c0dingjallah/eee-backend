const express = require('express')
const {
  createOrder,
  getOrders,
  getAllorders,
  deleteOrder,
  updateOrder
} = require('../controllers/orderController')
//const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all order routes
//router.use(requireAuth)

// GET all orders
router.get('/:id', getOrders)

//GET all order
router.get('/', getAllorders)

// POST a new order
router.post('/', createOrder)

// DELETE a order
router.delete('/:id', deleteOrder)

// UPDATE a order
router.patch('/:id', updateOrder)


module.exports = router