import React from 'react'
import { Link } from 'react-router-dom'

import { List, Divider } from 'antd'

const Home = () => {
  const data = [
    { text: 'Are you an admin? Go to dashboard', link: '/dashboard' },
    { text: 'Are you a normal user? Go to register page', link: '/register' },
  ]
  return (
    <div className='dashboard'>
      <Divider orientation='left'>Welcome</Divider>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <Link to={item.link}>
            <List.Item className='dashboard__item'>{item.text}</List.Item>
          </Link>
        )}
      />
    </div>
  )
}

export default Home
