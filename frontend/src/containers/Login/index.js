import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { loginRequest } from 'modules/auth/actions'

const Login = () => {
  const dispatch = useDispatch()

  const onFinish = (values) => {
    dispatch(loginRequest(values))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name='basic'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='login-form__login-btn'
        >
          Log in
        </Button>
        <Link to='/home'>Welcome page</Link>
      </Form.Item>
    </Form>
  )
}

export default Login
