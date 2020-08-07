import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import {
  userIsAuthenticatedRedir,
  userIsNotAuthenticatedRedir,
} from 'utils/auth-helpers'

import { CustomLayout, Home, Login, Register, UserList } from 'containers'

const Routes = () => {
  const HomePage = userIsNotAuthenticatedRedir(Home)
  const LoginPage = userIsNotAuthenticatedRedir(Login)
  const RegisterPage = userIsNotAuthenticatedRedir(Register)

  const UserListPage = userIsAuthenticatedRedir(UserList)

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => <Redirect to='/home' />} />
        <Route path='/home' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <CustomLayout>
          <Route path='/dashboard' component={UserListPage} />
        </CustomLayout>
      </Switch>
    </Router>
  )
}

export default Routes
