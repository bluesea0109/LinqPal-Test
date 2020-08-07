import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'

import { logoutRequest } from 'modules/auth/actions'
import { selectLoggedInUser } from 'modules/auth/selectors'

const { Sider, Header, Content, Footer } = Layout

const CustomLayout = ({ children }) => {
  const currentPath = window.location.pathname
  const [collapsed, setCollapsed] = useState(false)

  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={currentPath.split('/')[1]}
        >
          {loggedInUser && loggedInUser.isAdmin && (
            <Menu.Item key='dashboard' icon={<UserOutlined />}>
              <Link to='/dashboard'>Users</Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background'>
          <div
            className='btn-logout'
            onClick={() => {
              dispatch(logoutRequest())
            }}
          >
            <LogoutOutlined />
            <span>Log Out</span>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          UserList ©2020 Created by dev
        </Footer>
      </Layout>
    </Layout>
  )
}

export default CustomLayout
