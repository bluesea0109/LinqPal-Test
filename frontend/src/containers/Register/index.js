import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Form, Input, Button } from 'antd'
import CountryPhoneCode from 'antd-country-phone-input'

import { postUser } from 'modules/user/actions'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
}

const Register = () => {
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    console.log(values)
    const phone = values.telephoneNumber.code + values.telephoneNumber.phone
    dispatch(postUser({ ...values, telephoneNumber: phone }))
  }

  const phoneValidator = (rule, val, callback) => {
    let patt = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    return new Promise((resolve, reject) => {
      if (!patt.test(val && val.phone)) {
        reject('phone validation error!') // reject with error message
      } else {
        resolve()
      }
    })
  }

  const ssnValidator = (rule, val, callback) => {
    let patt = new RegExp('[0-9]{3}[-][0-9]{2}[-][0-9]{4}')
    return new Promise((resolve, reject) => {
      if (!patt.test(val)) {
        reject('ssn validation error!') // reject with error message
      } else {
        resolve()
      }
    })
  }

  return (
    <Form
      {...formItemLayout}
      className='user-form'
      name='user'
      onFinish={handleSubmit}
    >
      <Form.Item
        name='firstName'
        label='First Name'
        rules={[
          {
            required: true,
            message: 'Please input your First Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='lastName'
        label='Last Name'
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='telephoneNumber'
        label='Telephone Number'
        rules={[
          {
            validator: phoneValidator,
            message: 'Input correct phone type!',
          },
          {
            required: true,
            message: 'Please input your Telephone Number!',
          },
        ]}
      >
        <CountryPhoneCode />
      </Form.Item>

      <Form.Item
        name='fullAddress'
        label='Full Adress'
        rules={[
          {
            required: true,
            message: 'Please input your Full Address!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='ssn'
        label='SSN'
        rules={[
          {
            validator: ssnValidator,
            message: 'Input correct ssn type!',
          },
          {
            required: true,
            message: 'Please input your SSN!',
          },
        ]}
      >
        <Input placeholder='123-45-6789' />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>

        <Link className='user-form__dashboard-link' to='/home'>
          Welcome page
        </Link>
      </Form.Item>
    </Form>
  )
}

export default Register
