const bcrypt = require('bcrypt')
const validatePhoneNumber = require('validate-phone-number-node-js')
const validateSSN = require('ssn-validator')
const { Op } = require('sequelize')
const db = require('../models')
const { salt } = require('../config/auth.config.js')

const User = db.User

module.exports = {
  index: async (req, res, next) => {
    const page = Number(req.query.page) || 1
    const per_page = Number(req.query.per_page) || 10

    let options = {
      page: page,
      paginate: per_page,
      worder: [['id', 'ASC']],
      where: {
        isAdmin: {
          [Op.eq]: false,
        },
      },
    }

    await User.paginate(options)
      .then((data) =>
        res.json({
          results: data.docs,
          currentPage: page,
          totalSize: data.total,
        }),
      )
      .catch((err) => next(err))
  },

  create: async (req, res, next) => {
    const { telephoneNumber, ssn } = req.body
    if (!validatePhoneNumber.validate(telephoneNumber)) {
      return res
        .status(400)
        .json({ message: 'Telephone Number is missing or invalid!' })
    }

    if (!validateSSN.isValid(ssn)) {
      return res.status(400).json({ message: 'SSN is missing or invalid!' })
    }

    const user = User.build(req.body)
    user.ssn = await bcrypt.hash(ssn, salt)

    user
      .save()
      .then((user) => {
        res.json(user)
      })
      .catch((err) => next(err))
  },
}
