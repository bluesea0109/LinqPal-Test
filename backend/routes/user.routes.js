const express = require('express')
const router = express.Router()
const authorize = require('../helpers/authorize')
const controller = require('../controllers/user.controller')
const db = require('../models')
const User = db.User

router.get('/', authorize(true), controller.index)
router.post('/', controller.create)

module.exports = router
