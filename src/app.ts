import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'

import customersRouter from './routes/customers'
import cartsRouter from './routes/carts'
import checkoutRouter from './routes/checkout'
import booksRouter from './routes/books'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))

app.use('/customers', customersRouter)
app.use('/carts', cartsRouter)
app.use('/checkout', checkoutRouter)
app.use('/books', booksRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
