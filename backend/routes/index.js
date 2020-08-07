const express = require('express')
const router = express.Router()
const authRoute = require('./auth.routes')
const userRoute = require('./user.routes')

router.use('/auth', authRoute)
router.use('/users', userRoute)

module.exports = router
