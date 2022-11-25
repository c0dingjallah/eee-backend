require('dotenv').config()

const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/order')
const userRoutes = require('./routes/user')
const app = express().use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);


// app.use(cors({
//   origin: '*',    
//   credentials: true,
//   preflightContinue: false,     
//   optionsSuccessStatus: 204 
// }));

// middleware

// app.options('*', cors());

app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// express app


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