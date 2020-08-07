const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorHandler = require('./helpers/error-handler')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', router)
app.use(errorHandler)

app.listen(4000, () => {
  console.log('Server is listening on port 4000')
})
