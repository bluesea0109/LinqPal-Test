const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config.js')
const db = require('../models')
const User = db.User

module.exports = authorize

function authorize(isAdmin = false) {
  return [
    // authenticate JWT token and attach user to request object
    (req, res, next) => {
      let token = req.headers['authorization'].split(' ')[1]

      if (!token) {
        return res.status(403).send({
          message: 'No token provided!',
        })
      }

      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Token is invalid!',
          })
        }

        const user = await User.findByPk(decoded.id, {
          attributes: [
            'id',
            'firstName',
            'lastName',
            'username',
            'password',
            'isAdmin',
          ],
        })
        if (!user) {
          return res.status(404).send({
            message: 'Not found',
          })
        }

        next()
      })
    },

    // authorize based on user role
    (req, res, next) => {
      if (!isAdmin) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' })
      }

      // authentication and authorization successful
      next()
    },
  ]
}
