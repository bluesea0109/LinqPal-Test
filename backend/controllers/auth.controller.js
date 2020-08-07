const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const { secret, salt } = require('../config/auth.config.js')
const User = db.User

const Auth = {
  signin: async function (req, res) {
    const { username, password } = req.body

    try {
      const user = await User.findOne({
        attributes: [
          'id',
          'firstName',
          'lastName',
          'username',
          'password',
          'isAdmin',
        ],
        where: {
          username: username,
        },
      })

      // check user is empty or not
      if (user === null) {
        return res.status(400).json({
          message: 'Username or password is not correct',
        })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: 'Username or password is not correct',
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        secret,
        { expiresIn: '3d' },
      )

      res.json({ user, token })
    } catch (ex) {
      res.status(400).json({
        message: 'Invalid username and password',
      })
    }
  },
}

module.exports = Auth
