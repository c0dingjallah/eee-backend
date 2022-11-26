require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/order')
const userRoutes = require('./routes/user')
const app = express()


// middleware


app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// express app
app.options('*', cors());

// routes
app.use('/api/order', orderRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })